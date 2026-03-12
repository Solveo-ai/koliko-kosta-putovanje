const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fmt(value: number): string {
  return (
    "€" +
    new Intl.NumberFormat("sr-RS", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  );
}

interface Breakdown {
  transportPP: number;
  accommodationPP: number;
  insurancePP: number;
  totalPP: number;
  totalGroup: number;
}

function buildPlaneSection(data: Breakdown, flightType: "budget" | "avg"): string {
  const subtitle = flightType === "budget" ? "(Budget let)" : "(Prosečna cena leta)";
  return [
    "Avionom",
    subtitle,
    `- Let: ${fmt(data.transportPP)}`,
    `- Smeštaj: ${fmt(data.accommodationPP)}`,
    `- Putno osiguranje: ${fmt(data.insurancePP)}`,
    `- Ukupno po osobi: ${fmt(data.totalPP)}`,
    `- Ukupno za grupu: ${fmt(data.totalGroup)}`,
  ].join("\n");
}

function buildCarSection(data: Breakdown | null): string {
  if (!data) return "";
  return [
    "Automobilom",
    "",
    `- Gorivo + putarina: ${fmt(data.transportPP)}`,
    `- Smeštaj: ${fmt(data.accommodationPP)}`,
    `- Putno osiguranje: ${fmt(data.insurancePP)}`,
    `- Ukupno po osobi: ${fmt(data.totalPP)}`,
    `- Ukupno za grupu: ${fmt(data.totalGroup)}`,
  ].join("\n");
}

function buildSavingsText(cheaperOption: string | null, savingsPP: number | null): string {
  if (!cheaperOption) return "";
  const label = cheaperOption === "plane" ? "avion" : "automobil";
  let text = `Najpovoljnija opcija za ovo putovanje je: ${label}.`;
  if (savingsPP != null && savingsPP > 0) {
    text += ` Ušteda po osobi: ${fmt(savingsPP)}.`;
  }
  return text;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const {
      email,
      destinationId,
      destinationName,
      days,
      travelers,
      flightType,
      cheaperOption,
      savingsPP,
      planeBudget,
      planeAvg,
      car,
    } = await req.json();

    console.log("Received calculator payload:", {
      email,
      destinationName,
      days,
      travelers,
      flightType,
      cheaperOption,
      savingsPP,
      planeBudget,
      planeAvg,
      car,
    });

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const brevoApiKey = Deno.env.get("BREVO_API_KEY_TRAVEL_COST");
    const brevoListId = Deno.env.get("BREVO_LIST_ID_TRAVEL_COST");

    if (!brevoApiKey || !brevoListId) {
      console.error("Missing Brevo configuration secrets");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const listId = parseInt(brevoListId, 10);
    const trimmedEmail = email.trim().toLowerCase();

    // ── 1. Add / update contact in list ──
    console.log(`Adding contact ${trimmedEmail} to Brevo list ${listId}`);

    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        email: trimmedEmail,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!brevoRes.ok) {
      const errBody = await brevoRes.text();
      console.error(`Brevo contact API error (${brevoRes.status}): ${errBody}`);

      if (!(brevoRes.status === 400 && errBody.includes("Contact already exist"))) {
        return new Response(JSON.stringify({ error: "Failed to add contact" }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.log("Contact already exists, continuing to send email");
    } else {
      console.log("Contact added successfully");
    }

    // ── 2. Send transactional email ──
    const selectedPlane: Breakdown = flightType === "budget" ? planeBudget : planeAvg;

    const planeTitle = "Avionom";
    const planeSubtitle = flightType === "budget" ? "Jeftiniji letovi (LCC)" : "Prosečni letovi";
    const planeTransport = fmt(selectedPlane.transportPP);
    const planeAccommodation = fmt(selectedPlane.accommodationPP);
    const planeInsurance = fmt(selectedPlane.insurancePP);
    const planeTotalPP = fmt(selectedPlane.totalPP);
    const planeTotalGroup = fmt(selectedPlane.totalGroup);

    const carTitle = "Automobilom";
    const carSubtitle = "";
    const carTransport = car ? fmt(car.transportPP) : "";
    const carAccommodation = car ? fmt(car.accommodationPP) : "";
    const carInsurance = car ? fmt(car.insurancePP) : "";
    const carTotalPP = car ? fmt(car.totalPP) : "";
    const carTotalGroup = car ? fmt(car.totalGroup) : "";

    const cheaperOptionLabel = cheaperOption === "plane" ? "Avion" : cheaperOption === "car" ? "Automobil" : "";

    const savingsPPFormatted = savingsPP != null && savingsPP > 0 ? fmt(savingsPP) : "";

    const comparisonUrl = `https://policymarket.shop/${destinationId}`;

    const emailPayload = {
      sender: { name: "PolicyMarket", email: "info@policymarket.co" },
      to: [{ email: trimmedEmail }],
      templateId: 1,
      params: {
        debugVersion: "v2-transport-params",
        destinationName,
        days,
        travelers,
        planeTitle,
        planeSubtitle,
        planeTransport,
        planeAccommodation,
        planeInsurance,
        planeTotalPP,
        planeTotalGroup,
        carTitle,
        carSubtitle,
        carTransport,
        carAccommodation,
        carInsurance,
        carTotalPP,
        carTotalGroup,
        cheaperOptionLabel,
        savingsPPFormatted,
        comparisonUrl,
      },
    };

    console.log("V2_TRANSPORT_PARAMS", emailPayload.params);

    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailRes.ok) {
      const emailErr = await emailRes.text();
      console.error(`Brevo transactional email error (${emailRes.status}): ${emailErr}`);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailResult = await emailRes.json();
    console.log("Transactional email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({
        success: true,
        receivedPayload: {
          email,
          destinationName,
          days,
          travelers,
          flightType,
          cheaperOption,
          savingsPP,
          planeBudget,
          planeAvg,
          car,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
