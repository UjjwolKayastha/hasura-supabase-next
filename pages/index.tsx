import { Auth, Typography, Button } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';

const Home = (props: any) => {
  const { user } = Auth.useUser();
  if (user)
    return (
      <div style={{ padding: 30 }}>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </div>
    );
  return <div style={{ padding: 30 }}>{props.children}</div>;
};

export default function AuthBasic() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Home supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Home>
    </Auth.UserContextProvider>
  );
}
