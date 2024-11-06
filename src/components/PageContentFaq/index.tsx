import { AccordionList, Button, Loader, SearchInput } from "@components";
import { IPageContentFaq, IPageContentFaqData } from "@interfaces";
import { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import styles from "./PageContentFaq.module.scss";

const PageContentFaq = (props: IPageContentFaq) => {
  const { faqData, focusId, focusCat, noResultFound } = props;
  const [searchStringlist, setsearchStringlist] = useState<any>(faqData);
  const [isDisplay, setisDisplay] = useState(true);
  const [filteredCategory, setFilteredCategory] = useState<any>(null);
  const currFocus = useRef<HTMLDivElement>(null);
  const outOfFocus = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<any>();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const searchRef = useRef<any>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  useEffect(() => {
    if (currFocus?.current) {
      window && window.scrollTo(0, currFocus?.current?.offsetTop - 170);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currFocus, currFocus.current]);

  useEffect(() => {
    setLoadingState(true);
    const categoryData: any = new Set();
    faqData?.map((item: IPageContentFaqData) => {
      categoryData.add(item?.category);
    });
    const cat = Array.from(new Set(categoryData));
    setCategories(cat);

    focusCat ? categorysearch(focusCat) : setsearchStringlist(faqData);
    setLoadingState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqData]);

  const categorysearch = (searchCategory: any) => {
    const newCategory = faqData?.filter(
      (el: any) => el?.category.toLowerCase() === searchCategory.toLowerCase()
    );
    setFilteredCategory(newCategory);
    setsearchStringlist(newCategory?.length > 0 ? newCategory : faqData);
    setActiveCategory(searchCategory.toLowerCase());
  };

  const getEachItem = (object: any, faqString: any) => {
    const result: any = [];
    object.forEach((item: any) => {
      if (searchItem(item, faqString)) {
        result.push(item);
      }
    });
    return result;
  };

  const searchItem = (item: any, faqString: any) => {
    let found = false;
    Object.keys(item).forEach((key) => {
      if (typeof item[key] === "object") {
        found = searchItem(item[key], faqString);
      } else if (typeof item[key] === "string") {
        // const searchAsRegEx = new RegExp(faqString, 'g');
        if (item[key].toLowerCase().includes(faqString)) {
          found = true;
        }
      }
      found = false;
    });
    return found;
  };

  const sortFaqByHeading = (firstFaq: any, secondFaq: any) => {
    if (
      firstFaq?.heading?.toLowerCase() ===
        searchRef.current.value.toLowerCase() ||
      firstFaq?.heading
        ?.toLowerCase()
        .includes(searchRef.current.value.toLowerCase())
    ) {
      return -1;
    } else if (
      secondFaq?.heading?.toLowerCase() ===
        searchRef.current.value.toLowerCase() ||
      secondFaq?.heading
        ?.toLowerCase()
        .includes(searchRef.current.value.toLowerCase())
    ) {
      return 1;
    } else {
      return 0;
    }
  };
  const SearchFaqByString = (e: any) => {
    // const faqString = e.target.value.toLowerCase()?.replace(/\W/g, ''); alphanumeric
    const faqString = e.target.value.toLowerCase();
    searchRef.current.value = faqString;
    if (faqString !== "") {
      const resultList = getEachItem(filteredCategory ?? faqData, faqString);
      const newMatchedData = (filteredCategory ?? faqData)?.map((item: any) => {
        const currFaq: any = {
          id: item?.id,
          category: item?.category,
          heading: item?.heading,
        };
        let res = item?.data?.map((subItem: any) => {
          const found =
            subItem?.title?.toLowerCase()?.includes(faqString) ||
            subItem?.body?.toLowerCase()?.includes(faqString);

          if (found) {
            return subItem;
          }
        });
        res = res.filter((i: any) => i !== undefined);
        currFaq["data"] = res;
        if (res && res?.length) {
          return currFaq;
        }
      });
      let mergedarr = [...resultList, ...newMatchedData];
      mergedarr = mergedarr.filter((i) => i !== undefined);
      let matchedFaq = Array.from(new Set(mergedarr));
      matchedFaq = matchedFaq.sort(sortFaqByHeading);
      setsearchStringlist(
        matchedFaq.length === 0 ? searchStringlist : matchedFaq
      );
      setisDisplay(matchedFaq.length == 0 ? false : true);
    } else {
      setsearchStringlist(filteredCategory ?? faqData);
      setisDisplay(true);
    }
  };

  const onClearSearch = () => {
    if (filteredCategory === null || filteredCategory === undefined) {
      setsearchStringlist(faqData);
      setisDisplay(true);
    } else {
      setsearchStringlist(filteredCategory);
      setisDisplay(true);
    }
    searchRef.current.value = "";
  };

  const getListData = (list: any) =>
    list?.map((item: any) => {
      return {
        title: item.title,
        body: (
          <div
            itemProp="text"
            dangerouslySetInnerHTML={{ __html: item.body }}
          ></div>
        ),
      };
    });
  if (loadingState) {
    return (
      <div className="pageLoader">
        <Loader bg={"#000000"} />
      </div>
    );
  }

  return (
    <div
      itemScope
      itemType="https://schema.org/FAQPage"
      className={styles.faqs}
    >
      <div className={styles.filterButtons}>
        {categories &&
          categories.map((items: any, index: number) => {
            return (
              <Button
                variant="outline-secondary"
                size="md"
                key={`${items + index}`}
                onClick={() => categorysearch(items)}
                className={`${
                  activeCategory === items.toLowerCase() && "active activeFAQ"
                }`}
              >
                {items}
              </Button>
            );
          })}
      </div>
      <div className={styles.PageContent}>
        <div>
          <div className={styles.sectionFaqs}>
            <Col lg={4} md={6}>
              <SearchInput
                SearchFaqByString={SearchFaqByString}
                onClearSearch={onClearSearch}
                searchRef={searchRef}
              />
            </Col>
            {isDisplay && searchStringlist?.length > 0 ? (
              searchStringlist?.map((list: any, index: number) => (
                <div key={`${list?.heading + index}`} id={list?.id}>
                  {list?.links ? (
                    <h2 itemProp="headline" className={styles.pageHeading}>
                      <a href={list?.links} itemProp="url">
                        {list?.heading}
                      </a>
                    </h2>
                  ) : (
                    <h2 itemProp="headline" className={styles.pageHeading}>
                      {list?.heading}
                    </h2>
                  )}
                  <div
                    className="section-row"
                    ref={
                      focusId && list?.id === focusId ? currFocus : outOfFocus
                    }
                  >
                    {getListData(list?.data)?.length > 0 && (
                      <AccordionList list={getListData(list?.data)} />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.resetFilterContainer}>
                <h3 itemProp="headline">{noResultFound?.heading}</h3>
                <p itemProp="description">{noResultFound?.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageContentFaq;
