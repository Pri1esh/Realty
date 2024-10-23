import { VerticalTabs } from '@components';
import { IModalFilter, IPrice } from '@interfaces';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './filter.module.scss';
import FilterContent from './FilterContent';

const ModalFilter = (props: IModalFilter) => {
  const {
    locationFilterData,
    allProperties,
    setfilteredProperties,
    clearFilterData,
    setshow,
    selectedResidentialMinPrice,
    setselectedResidentialMinPrice,
    selectedResidentialMaxPrice,
    setselectedResidentialMaxPrice,
    selectedCommercialMinPrice,
    setselectedCommercialMinPrice,
    selectedCommercialMaxPrice,
    setselectedCommercialMaxPrice,
    currTab,
    setCurrTab,
    commercialSelected,
    setcommercialSelected,
    residentialSelected,
    setresidentialSelected,
    previousCommercialFilterState,
    setpreviousCommercialFilterState,
    previousResidentialFilterState,
    setpreviousResidentialFilterState,
    setTotalFiltersSelected,
    clearAllLabel,
    applyFilterLabel,
    filteredTabtype = '',
    status,
    resetPropertyStatus,
  } = props;

  const [minimumPrice, setMinPrice] = useState<IPrice>();
  const [maximumPrice, setMaxPrice] = useState<IPrice>();
  const [tabHeading, setTabHeading] = useState<string>('');
  const {
    control: residentialControl,
    reset: residentialReset,
    getValues: residentialGetValues,
    handleSubmit: residentialHandleSubmit,
    setValue: residentailSetValue,
  } = useForm<any>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: null,
  });
  const {
    control: commercialControl,
    reset: commercialReset,
    getValues: commercialGetValues,
    handleSubmit: commercialHandleSubmit,
    setValue: commercialSetValue,
  } = useForm<any>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: null,
  });

  useEffect(() => {
    residentialReset(previousResidentialFilterState);
    commercialReset(previousCommercialFilterState);
    locationFilterData?.map(
      (item: {
        tabID: { toLowerCase: () => (string | null)[] };
        tabHeading: React.SetStateAction<string>;
        filterButtons: any[];
      }) => {
        item?.tabID.toLowerCase().includes(filteredTabtype) && setTabHeading(item?.tabHeading);
        return item?.filterButtons?.map(
          (element: {
            maxRangeValue: React.SetStateAction<string | null | undefined>;
            minRangeValue: React.SetStateAction<string | null | undefined>;
          }) => {
            element?.maxRangeValue && setMaxPrice(element?.maxRangeValue);
            element?.minRangeValue && setMinPrice(element?.minRangeValue);
          },
        );
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPriceResidential = (prices: { minPrice: number; maxPrice: number }) => {
    setselectedResidentialMinPrice(prices.minPrice);
    setselectedResidentialMaxPrice(prices.maxPrice);
    setCurrTab('residential');
  };

  const getPriceCommercial = (prices: { minPrice: number; maxPrice: number }) => {
    setselectedCommercialMinPrice(prices.minPrice);
    setselectedCommercialMaxPrice(prices.maxPrice);
    setCurrTab('commercial');
  };

  const configureTabFilters = (currTabFilterData: any) => {
    const arr: any[] = [];
    currTabFilterData?.map((currTabFilter: any, index: number) => {
      if (filteredTabtype) {
        currTabFilter?.tabID?.toLowerCase().includes(filteredTabtype) &&
          arr.push(
            <FilterContent
              currTabFilter={currTabFilter}
              index={index}
              residentialHandleSubmit={residentialHandleSubmit}
              commercialHandleSubmit={commercialHandleSubmit}
              applyAllFiltersHandler={applyAllFiltersHandler}
              getPriceResidential={getPriceResidential}
              getPriceCommercial={getPriceCommercial}
              selectedResidentialMinPrice={selectedResidentialMinPrice}
              selectedResidentialMaxPrice={selectedResidentialMaxPrice}
              selectedCommercialMinPrice={selectedCommercialMinPrice}
              selectedCommercialMaxPrice={selectedCommercialMaxPrice}
              setselectedResidentialMinPrice={setselectedResidentialMinPrice}
              setselectedResidentialMaxPrice={setselectedResidentialMaxPrice}
              setselectedCommercialMinPrice={setselectedCommercialMinPrice}
              setselectedCommercialMaxPrice={setselectedCommercialMaxPrice}
              residentialControl={residentialControl}
              commercialControl={commercialControl}
              residentialSelected={residentialSelected}
              commercialSelected={commercialSelected}
              commercialSetValue={commercialSetValue}
              residentailSetValue={residentailSetValue}
              handleButtonClick={handleButtonClick}
              clearAllFiltersHandler={clearAllFiltersHandler}
              clearAllLabel={clearAllLabel}
              applyFilterLabel={applyFilterLabel}
              status={status}
            />,
          );
      } else {
        arr.push({
          content: (
            <div key={`${currTabFilter?.tabID + index}`}>
              <FilterContent
                currTabFilter={currTabFilter}
                index={index}
                residentialHandleSubmit={residentialHandleSubmit}
                commercialHandleSubmit={commercialHandleSubmit}
                applyAllFiltersHandler={applyAllFiltersHandler}
                getPriceResidential={getPriceResidential}
                getPriceCommercial={getPriceCommercial}
                selectedResidentialMinPrice={selectedResidentialMinPrice}
                selectedResidentialMaxPrice={selectedResidentialMaxPrice}
                selectedCommercialMinPrice={selectedCommercialMinPrice}
                selectedCommercialMaxPrice={selectedCommercialMaxPrice}
                setselectedResidentialMinPrice={setselectedResidentialMinPrice}
                setselectedResidentialMaxPrice={setselectedResidentialMaxPrice}
                setselectedCommercialMinPrice={setselectedCommercialMinPrice}
                setselectedCommercialMaxPrice={setselectedCommercialMaxPrice}
                residentialControl={residentialControl}
                commercialControl={commercialControl}
                residentialSelected={residentialSelected}
                commercialSelected={commercialSelected}
                commercialSetValue={commercialSetValue}
                residentailSetValue={residentailSetValue}
                handleButtonClick={handleButtonClick}
                clearAllFiltersHandler={clearAllFiltersHandler}
                clearAllLabel={clearAllLabel}
                applyFilterLabel={applyFilterLabel}
                status={status}
              />
            </div>
          ),
          key: `${currTabFilter?.tabID}`,
          title: `${currTabFilter?.tabHeading}`,
        });
      }
    });
    return arr;
  };

  const handleButtonClick = (propertyType: string, buttonType: string, buttonLabel: string) => {
    let arr: any = {};
    propertyType.toLocaleLowerCase().includes('residential') ? setCurrTab('residential') : setCurrTab('commercial');
    arr = propertyType.toLocaleLowerCase().includes('residential') ? residentialSelected : commercialSelected;

    if (arr[buttonType].includes(buttonLabel)) {
      arr[buttonType] = arr[buttonType].filter((i: any) => i !== buttonLabel);
    } else {
      arr[buttonType].push(buttonLabel);
    }
    propertyType.toLowerCase().includes('residential') ? setresidentialSelected(arr) : setcommercialSelected(arr);
    propertyType.toLowerCase().includes('residential')
      ? setpreviousResidentialFilterState(residentialGetValues())
      : setpreviousCommercialFilterState(commercialGetValues());
  };

  const resetAll = (dataObject: any, setValue: any) => {
    const dataKeys = Object.keys(dataObject);
    dataKeys.forEach((item) => setValue(item, null));
  };

  const clearAllFiltersHandler = (currFilterTab: string) => {
    if (currFilterTab.toLowerCase().includes('commercial')) {
      setpreviousCommercialFilterState(null);
      setselectedCommercialMaxPrice(null);
      setselectedCommercialMinPrice(null);
      setcommercialSelected({ ...commercialSelected, propertystatus: [], propertyconfiguration: [] });
      setCurrTab('commercial');
      resetAll(commercialGetValues(), commercialSetValue);
    } else {
      setpreviousResidentialFilterState(null);
      setselectedResidentialMinPrice(null);
      setselectedResidentialMaxPrice(null);
      setresidentialSelected({ ...residentialSelected, propertystatus: [], propertyconfiguration: [] });
      setCurrTab('residential');
      resetAll(residentialGetValues(), residentailSetValue);
    }
    filteredTabtype ? setTotalFiltersSelected(1) : setTotalFiltersSelected(0);
    resetPropertyStatus();
    clearFilterData();
  };

  const applyAllFiltersHandler = (currFilterTab: string) => {
    setCurrTab(currFilterTab);
    let arr: any = {};
    let minPrice: any = undefined;
    let maxPrice: any = undefined;
    let filterKeys: any = undefined;

    if (currFilterTab.toLowerCase().includes('residential')) {
      arr = residentialSelected;
      minPrice = selectedResidentialMinPrice;
      maxPrice = selectedResidentialMaxPrice;

      setTotalFiltersSelected(
        (minimumPrice && minPrice !== parseInt(minimumPrice.replace('+', '')) / 100000) ||
          (maximumPrice && maxPrice !== parseInt(maximumPrice.replace('+', '')) / 100000)
          ? arr.propertyconfiguration.length + arr.propertystatus.length + 2
          : arr.propertyconfiguration.length + arr.propertystatus.length + 1,
      );
      filterKeys = residentialGetValues();
    } else {
      arr = commercialSelected;
      minPrice = selectedCommercialMinPrice;
      maxPrice = selectedCommercialMaxPrice;
      setTotalFiltersSelected(
        (minimumPrice && minPrice !== parseInt(minimumPrice.replace('+', '')) / 100000) ||
          (maximumPrice && maxPrice !== parseInt(maximumPrice.replace('+', '')) / 100000)
          ? arr?.propertyconfiguration?.length + arr?.propertystatus?.length + 2
          : arr?.propertyconfiguration?.length + arr?.propertystatus?.length + 1,
      );
      filterKeys = commercialGetValues();
    }

    const filteredProperties = allProperties?.filter((i: any) => {
      if (i?.data?.propertyTypeFilter.toLowerCase().includes(currFilterTab.toLowerCase())) {
        if (arr?.propertyconfiguration?.length > 0 && arr?.propertystatus?.length > 0) {
          const property = i?.data?.propertyConfigurationFilter
            .map((curr: any) => {
              if (
                i?.data?.propertyPricefilter !== 0 &&
                ((minimumPrice && minPrice !== parseInt(minimumPrice.replace('+', '')) / 100000) ||
                  (maximumPrice && maxPrice !== parseInt(maximumPrice.replace('+', '')) / 100000))
              ) {
                return (
                  filterKeys[`${currFilterTab}${curr?.toLowerCase()}`] &&
                  minPrice <= i?.data?.propertyPricefilter / 100000 &&
                  i?.data?.propertyPricefilter / 100000 <= maxPrice &&
                  i
                );
              } else {
                return filterKeys[`${currFilterTab}${curr?.toLowerCase()}`] && i;
              }
            })
            .filter((checkProperty: any) => {
              return (
                !!checkProperty &&
                filterKeys[`${currFilterTab}${i?.data?.propertyStatusFilter.toLowerCase()}`] &&
                checkProperty
              );
            });
          return property[0];
        } else if (arr?.propertyconfiguration?.length > 0 && arr?.propertystatus?.length <= 0) {
          const property = i?.data?.propertyConfigurationFilter
            .map((curr: any) => {
              if (
                i?.data?.propertyPricefilter !== 0 &&
                ((minimumPrice && minPrice !== parseInt(minimumPrice.replace('+', '')) / 100000) ||
                  (maximumPrice && maxPrice !== parseInt(maximumPrice.replace('+', '')) / 100000))
              ) {
                return (
                  filterKeys[`${currFilterTab}${curr?.toLowerCase()}`] &&
                  minPrice <= i?.data?.propertyPricefilter / 100000 &&
                  i?.data?.propertyPricefilter / 100000 <= maxPrice &&
                  i
                );
              } else {
                return filterKeys[`${currFilterTab}${curr?.toLowerCase()}`] && i;
              }
            })
            .filter((checkProperty: any) => {
              return !!checkProperty && checkProperty;
            });
          return property[0];
        } else if (arr?.propertyconfiguration?.length <= 0 && arr?.propertystatus?.length > 0) {
          if (
            i?.data?.propertyPricefilter !== 0 &&
            ((minimumPrice && minPrice !== parseInt(minimumPrice.replace('+', '')) / 100000) ||
              (maximumPrice && maxPrice !== parseInt(maximumPrice.replace('+', '')) / 100000))
          ) {
            return (
              filterKeys[`${currFilterTab}${i?.data?.propertyStatusFilter.toLowerCase()}`] &&
              minPrice <= i?.data?.propertyPricefilter / 100000 &&
              i?.data?.propertyPricefilter / 100000 <= maxPrice &&
              i
            );
          } else {
            return filterKeys[`${currFilterTab}${i?.data?.propertyStatusFilter.toLowerCase()}`] && i;
          }
        } else if (minPrice && maxPrice && i?.data?.propertyPricefilter !== 0) {
          return (
            minPrice <= i?.data?.propertyPricefilter / 100000 && i?.data?.propertyPricefilter / 100000 <= maxPrice && i
          );
        }
        return i;
      }
    });

    setpreviousResidentialFilterState(residentialGetValues());
    setpreviousCommercialFilterState(commercialGetValues());
    setfilteredProperties(filteredProperties);
    setshow(false);
  };

  return (
    <div className={styles.filter}>
      {filteredTabtype && <h2>{tabHeading}</h2>}
      {filteredTabtype ? (
        configureTabFilters(locationFilterData)
      ) : (
        <VerticalTabs
          className="scrollbar-x"
          horizontalTabView={true}
          isClick={true}
          defaultActiveKey={currTab}
          tabData={configureTabFilters(locationFilterData)}
          transition
        />
      )}
    </div>
  );
};
export default ModalFilter;
