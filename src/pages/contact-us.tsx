import type { NextPage } from 'next';
import Head from 'next/head';
import ContactUsView from '@views/contact';

const ContactUs: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact US</title>
      </Head>
      Contact us
      <ContactUsView />
    </>
  );
};

export default ContactUs;
