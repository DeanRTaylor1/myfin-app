import { Fragment, useEffect, useState } from 'react';

export default function Privacy({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    //console.log(currentUser);
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      <div className='w-[calc(100vw)] h-fit min-h-[calc(90vh)] flex flex-col items-start justify-start gap-10 z-10'>
        <div className='w-[100%] bg-white h-fit relative p-10 flex flex-col  justify-start items-center gap-4'>
          <div className='w-[90%] max-w-[1200px] flex flex-col justify-center items-center md:flex-row'>
            <div className='flex flex-col gap-8 justify-center items-center p-4 min-w-[450px]'>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Privacy Policy of MyFin
              </h1>
              <p className='w-full text-left'>
                MyFin operates the www.myfinapi.dev website, which provides the
                SERVICE. This page is used to inform website visitors regarding
                our policies with the collection, use, and disclosure of
                Personal Information if anyone decided to use our Service, the
                MyFin website. MyFin operates the www.myfinapi.dev website,
                which provides the SERVICE. This page is used to inform website
                visitors regarding our policies with the collection, use, and
                disclosure of Personal Information if anyone decided to use our
                Service, the MyFin website.
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Information Collection and Use
              </h1>
              <p className='w-full text-left'>
                For a better experience while using our Service, we may require
                you to provide us with certain personally identifiable
                information, including but not limited to your name, phone
                number, and postal address. The information that we collect will
                be used to contact or identify you.
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Log Data
              </h1>
              <p className='w-full text-left'>
                We want to inform you that whenever you visit our Service, we
                collect information that your browser sends to us that is called
                Log Data. This Log Data may include information such as your
                computer’s Internet Protocol (&quot;IP&quot;) address, browser
                version, pages of our Service that you visit, the time and date
                of your visit, the time spent on those pages, and other
                statistics.
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Cookies{' '}
              </h1>
              <p className='w-full text-left'>
                Cookies are files with small amount of data that is commonly
                used an anonymous unique identifier. These are sent to your
                browser from the website that you visit and are stored on your
                computer’s hard drive. Our website uses these
                &quot;cookies&quot; to collection information and to improve our
                Service. You have the option to either accept or refuse these
                cookies, and know when a cookie is being sent to your computer.
                If you choose to refuse our cookies, you may not be able to use
                some portions of our Service.c
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Service Providers
              </h1>
              <p className='w-full text-left'>
                We may employ third-party companies and individuals due to the
                following reasons: To facilitate our Service; To provide the
                Service on our behalf; To perform Service-related services; or
                To assist us in analyzing how our Service is used. We want to
                inform our Service users that these third parties have access to
                your Personal Information. The reason is to perform the tasks
                assigned to them on our behalf. However, they are obligated not
                to disclose or use the information for any other purpose.
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Service Providers
              </h1>
              <p className='w-full text-left'>
                We may employ third-party companies and individuals due to the
                following reasons: To facilitate our Service; To provide the
                Service on our behalf; To perform Service-related services; or
                To assist us in analyzing how our Service is used. We want to
                inform our Service users that these third parties have access to
                your Personal Information. The reason is to perform the tasks
                assigned to them on our behalf. However, they are obligated not
                to disclose or use the information for any other purpose.
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Security
              </h1>
              <p className='w-full text-left'>
                We value your trust in providing us your Personal Information,
                thus we are striving to use commercially acceptable means of
                protecting it. But remember that no method of transmission over
                the internet, or method of electronic storage is 100% secure and
                reliable, and we cannot guarantee its absolute security.
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Links to Other Sites
              </h1>
              <p className='w-full text-left'>
                Our Service may contain links to other sites. If you click on a
                third-party link, you will be directed to that site. Note that
                these external sites are not operated by us. Therefore, we
                strongly advise you to review the Privacy Policy of these
                websites. We have no control over, and assume no responsibility
                for the content, privacy policies, or practices of any
                third-party sites or services.
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Children&apos;s Privacy
              </h1>
              <p className='w-full text-left'>
                Our Services do not address anyone under the age of 13. We do
                not knowingly collect personal identifiable information from
                children under 13. In the case we discover that a child under 13
                has provided us with personal information, we immediately delete
                this from our servers. If you are a parent or guardian and you
                are aware that your child has provided us with personal
                information, please contact us so that we will be able to do
                necessary actions.
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Changes to This Privacy Policy
              </h1>
              <p className='w-full text-left'>
                We may update our Privacy Policy from time to time. Thus, we
                advise you to review this page periodically for any changes. We
                will notify you of any changes by posting the new Privacy Policy
                on this page. These changes are effective immediately, after
                they are posted on this page.
              </p>
              <h1 className='w-full font-extrabold text-xl text-left'>
                Contact Us
              </h1>
              <p className='w-full text-left'>
                If you have any questions or suggestions about our Privacy
                Policy, do not hesitate to contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Privacy.getInitialProps = async (
  context: any,
  client: any,
  currentUser: any
) => {
  return currentUser;
};
