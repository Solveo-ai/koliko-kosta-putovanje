const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const {
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
    } = await req.json();

    console.log('Received calculator payload:', {
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

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const brevoApiKey = Deno.env.get('BREVO_API_KEY_TRAVEL_COST');
    const brevoListId = Deno.env.get('BREVO_LIST_ID_TRAVEL_COST');

    if (!brevoApiKey || !brevoListId) {
      console.error('Missing Brevo configuration secrets');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const listId = parseInt(brevoListId, 10);
    const trimmedEmail = email.trim().toLowerCase();

    console.log(`Adding contact ${trimmedEmail} to Brevo list ${listId}`);

    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        email: trimmedEmail,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!brevoRes.ok) {
      const errBody = await brevoRes.text();
      console.error(`Brevo API error (${brevoRes.status}): ${errBody}`);

      // Contact already exists is not a real error
      if (brevoRes.status === 400 && errBody.includes('Contact already exist')) {
        console.log('Contact already exists, treating as success');
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Failed to add contact' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Contact added successfully');
    return new Response(JSON.stringify({
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
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
