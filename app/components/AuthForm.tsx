'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthForm() {
    const supabase = createClientComponentClient();
    return (
        <Auth
            supabaseClient={supabase}
            view='magic_link'
            showLinks={false}
            providers={[]}
            redirectTo='/auth/callback'
            appearance={{
                theme: ThemeSupa
            }}
        />
    )
}