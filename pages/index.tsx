import { Auth, Typography, Button, Image } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';

const Home = (props: any) => {
  const { user } = Auth.useUser();
  if (user)
    return (
      <div style={{ padding: 30 }}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            marginBottom: 15,
            flexDirection: 'column',
            gap: 15,
          }}
        >
          <Image
            source={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/${user?.user_metadata.profile_image}`}
            alt="profile"
          />
          <input name="profile_image" type="file" />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Typography.Text>Signed in: {user.email}</Typography.Text>
        </div>
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
