import { CustomImage, EnvironmentData, ReraData } from '@components';
import { ICertificates } from '@interfaces';
import styles from './Certificates.module.scss';

const Certificates = (props: ICertificates) => {
  const { list } = props;
  return (
    <div className={styles.certificate} itemScope itemType="https://schema.org/RealEstateListing">
      {list?.map(
        (
          data: {
            certificateID: string;
            data: [
              {
                heading: string;
                data: [
                  {
                    rera: [
                      {
                        downloadurl: string;
                        title: string;
                        reraNumber: string;
                        reraTitle: string;
                        titleLink: string;
                        titleLinkTarget?: string;
                      },
                    ];
                    link: string;
                    src: string;
                    alt: string;
                    propertyName: string;
                    reraHeading?: string;
                    envModal?: any;
                  },
                ];
              },
            ];
          },
          key: number,
        ) => (
          <div className={styles.wrapper} id={data?.certificateID} key={`${data?.certificateID + key}`}>
            {data?.data?.map(
              (
                item: {
                  heading: string;
                  data: [
                    {
                      rera: [
                        {
                          downloadurl: string;
                          title: string;
                          reraNumber: string;
                          reraTitle: string;
                          titleLink: string;
                          titleLinkTarget?: string;
                        },
                      ];
                      link: string;
                      src: string;
                      alt: string;
                      propertyName: string;
                      reraHeading?: string;
                      envModal?: any;
                    },
                  ];
                },
                index: number,
              ) => (
                <div key={`${(item?.heading || '') + index}`}>
                  <h2 itemProp="headline">{item?.heading}</h2>
                  {item?.data?.map(
                    (
                      data: {
                        rera?: [
                          {
                            downloadurl?: string;
                            title?: string;
                            reraNumber?: string;
                            reraTitle?: string;
                            titleLinkTarget?: string;
                            titleLink?: string;
                          },
                        ];
                        link: string;
                        src: string;
                        alt: string;
                        propertyName: string;
                        target?: string;
                        reraTitle?: string;
                        titleLink?: string;
                        reraHeading?: string;
                        envModal?: any;
                      },
                      key: number,
                    ) => (
                      <ul key={`${(data?.target ?? '') + key}`}>
                        <li>
                          {data.target ? (
                            <a itemProp="potentialAction" href={data?.link} target={data?.target}>
                              <CustomImage itemProp="image" src={data?.src} alt={data?.alt} />
                            </a>
                          ) : (
                            <a itemProp="potentialAction" href={data?.link}>
                              <CustomImage itemProp="image" src={data?.src} alt={data?.alt} />
                            </a>
                          )}
                        </li>
                        <li>
                          <h3 itemProp="headline">
                            {data.target ? (
                              <a
                                className={styles.propertyName}
                                itemProp="potentialAction"
                                href={data?.link}
                                target={data?.target}
                              >
                                {data?.propertyName}
                              </a>
                            ) : (
                              <a itemProp="potentialAction" href={data?.link} className={styles.propertyName}>
                                {data?.propertyName}
                              </a>
                            )}
                          </h3>

                          <ReraData reraInfo={data} />
                          {data?.envModal?.length > 0 && <EnvironmentData envInfo={data} />}
                        </li>
                      </ul>
                    ),
                  )}
                </div>
              ),
            )}
          </div>
        ),
      )}
    </div>
  );
};

export default Certificates;
