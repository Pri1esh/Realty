import { AboutAdani, Achievements, Breadcrumbs, ContactCta, EmiCalculator, Faq, Layout } from '@components';
import { IPage } from '@interfaces';
import type { NextPage } from 'next';
import { Container } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import HomeLoanEmiCalculatorData from 'src/assets/data/HomeLoanEmiCalculator.json';

const HomeLoanEmiCalculator: NextPage<IPage> = () => {
  return (
    <div>
      <Layout footerData={HomeLoanEmiCalculatorData?.footer} headerData={HomeLoanEmiCalculatorData?.header}>
        <main itemScope itemType="https://schema.org/WebPage">
          <Container>
            <div>
              {HomeLoanEmiCalculatorData?.breadCrumbList?.fields && (
                <Breadcrumbs list={HomeLoanEmiCalculatorData?.breadCrumbList?.fields} />
              )}
            </div>
            <EmiCalculator emiCalculatorData={HomeLoanEmiCalculatorData?.emiCalculatorData} />
            <div className="section-row section_faq">
              <Faq
                faqs={HomeLoanEmiCalculatorData?.Faq?.fields?.faqItems}
                heading={HomeLoanEmiCalculatorData?.Faq?.params?.ComponentTitle}
                seeall={HomeLoanEmiCalculatorData?.Faq?.params?.SeeAllKeyword}
                seeallLink={HomeLoanEmiCalculatorData?.Faq?.fields?.faqLink}
              />
            </div>
          </Container>

          <div className="section-row">
            <ContactCta getInTouchdata={HomeLoanEmiCalculatorData?.GetInTouch?.fields?.getInTouch[0]} />
          </div>
          <Container>
            <div className="section-row">
              <AboutAdani
                aboutData={HomeLoanEmiCalculatorData?.AboutAdaniHome?.fields[0]}
                readmore={HomeLoanEmiCalculatorData?.AboutAdaniHome?.params?.ReadMoreKeyword}
                readless={HomeLoanEmiCalculatorData?.AboutAdaniHome?.params?.ReadLessKeyword}
              />
            </div>
            <div className="section-row footerSection achievements">
              <Achievements data={HomeLoanEmiCalculatorData?.Achievements} />
            </div>
          </Container>
        </main>
      </Layout>
    </div>
  );
};

export default HomeLoanEmiCalculator;
