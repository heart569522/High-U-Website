import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

type Props = {
  session: any;
};

const withProtectedPage = <P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P & Props>
) => {
  const Wrapper = (props: P) => {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!session) {
        router.replace("/");
      }
    }, [session, router]);

    if (!session) {
      return null; // Or you can show a loading spinner or a message here
    }

    return <WrappedComponent {...props} session={session} />;
  };

  return Wrapper;
};

export default withProtectedPage;
