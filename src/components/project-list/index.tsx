import { IProjectlist, IProjectlistConfiguration, IProjectlistData } from '@interfaces';
import Styles from './project-list.module.scss';
const Projectlist = (props: IProjectlist) => {
  const { configurationTiles } = props;
  return (
    <section className={Styles.projectlist}>
      {configurationTiles?.map((data: [IProjectlistConfiguration], key: number) => (
        <div className="col-12 col-lg-3" key={`${data[0]?.title + key}`}>
          <h6>{data[0]?.title}</h6>
          <ul>
            {data[0]?.keys?.map((item: IProjectlistData, key: number) => (
              <li key={`${item.link + key}`}>
                <a href={item.link}>{item.keyword}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
export default Projectlist;
