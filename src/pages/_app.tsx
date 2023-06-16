import { type AppType } from "next/dist/shared/lib/utils";
import { Container, Header } from "~/styles/pages/app";
import logoImg from '../assets/logo.svg'
import Image from "next/legacy/image";
import { globalStyles } from "~/styles/globals";

globalStyles()

const App: AppType = ({ Component, pageProps }) => {
  return (
    <Container>
      <Header>
        <Image src={logoImg as string} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
};

export default App;
