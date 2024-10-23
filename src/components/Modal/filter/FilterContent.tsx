import { Button, RangeFilter, Ripple } from '@components';
import { IFilterContent } from '@interfaces';
import { Controller } from 'react-hook-form';
import styles from './filter.module.scss';

const FilterContent = (props: IFilterContent) => {
  const {
    currTabFilter,
    index,
    residentialHandleSubmit,
    commercialHandleSubmit,
    applyAllFiltersHandler,
    getPriceResidential,
    getPriceCommercial,
    selectedResidentialMinPrice,
    selectedResidentialMaxPrice,
    selectedCommercialMinPrice,
    selectedCommercialMaxPrice,
    setselectedResidentialMinPrice,
    setselectedResidentialMaxPrice,
    setselectedCommercialMinPrice,
    setselectedCommercialMaxPrice,
    residentialControl,
    commercialControl,
    residentialSelected,
    commercialSelected,
    commercialSetValue,
    residentailSetValue,
    handleButtonClick,
    clearAllFiltersHandler,
    clearAllLabel,
    applyFilterLabel,
    status,
  } = props;

  const getPriceRange = (isResidential: boolean, currTabType: any, rangeType: string) => {
    switch (true) {
      case isResidential && selectedResidentialMinPrice && rangeType === 'min':
        return selectedResidentialMinPrice;
      case isResidential && rangeType === 'min':
        return parseInt(currTabType?.minRangeValue) / 100000;
      case isResidential && selectedResidentialMaxPrice && rangeType === 'max':
        return selectedResidentialMaxPrice;
      case isResidential && rangeType === 'max':
        return parseInt(currTabType?.maxRangeValue) / 100000;
      case selectedCommercialMinPrice && rangeType === 'min':
        return selectedCommercialMinPrice;
      case rangeType === 'min':
        return parseInt(currTabType?.minRangeValue) / 100000;
      case selectedCommercialMaxPrice && rangeType === 'max':
        return selectedCommercialMaxPrice;
      case rangeType === 'max':
        return parseInt(currTabType?.maxRangeValue) / 100000;
      default:
        return 0;
    }
  };

  const getPriceFilterLabels = (isResidential: boolean, currTabType: any, rangeType: string) => {
    switch (true) {
      case isResidential && rangeType === 'min' && !selectedResidentialMinPrice:
        setselectedResidentialMinPrice(parseInt(currTabType?.minRangeValue) / 100000);
        return;
      case isResidential && rangeType === 'min' && !!selectedResidentialMinPrice && selectedResidentialMinPrice >= 100:
        return selectedResidentialMinPrice ? `${selectedResidentialMinPrice / 100} Cr` : '';
      case isResidential && rangeType === 'min' && !!selectedResidentialMinPrice:
        return `${selectedResidentialMinPrice} Lac${selectedResidentialMinPrice === 1 ? '' : 's'}`;
      case isResidential && rangeType === 'max' && !selectedResidentialMaxPrice:
        setselectedResidentialMaxPrice(parseInt(currTabType?.maxRangeValue) / 100000);
        return;
      case isResidential && rangeType === 'max' && !!selectedResidentialMaxPrice && selectedResidentialMaxPrice >= 100:
        return selectedResidentialMaxPrice ? `${selectedResidentialMaxPrice / 100} Cr` : '';
      case isResidential && rangeType === 'max' && !!selectedResidentialMaxPrice:
        return `${selectedResidentialMaxPrice} Lac${selectedResidentialMaxPrice === 1 ? '' : 's'}`;
      case rangeType === 'min' && !selectedCommercialMinPrice:
        setselectedCommercialMinPrice(parseInt(currTabType?.minRangeValue) / 100000);
        return;
      case rangeType === 'min' && !!selectedCommercialMinPrice && selectedCommercialMinPrice >= 100:
        return selectedCommercialMinPrice ? `${selectedCommercialMinPrice / 100} Cr` : '';
      case rangeType === 'min' && !!selectedCommercialMinPrice:
        return `${selectedCommercialMinPrice} Lac${selectedCommercialMinPrice === 1 ? '' : 's'}`;
      case rangeType === 'max' && !selectedCommercialMaxPrice:
        setselectedCommercialMaxPrice(parseInt(currTabType?.maxRangeValue) / 100000);
        return;
      case rangeType === 'max' && !!selectedCommercialMaxPrice && selectedCommercialMaxPrice >= 100:
        return selectedCommercialMaxPrice ? `${selectedCommercialMaxPrice / 100} Cr` : '';
      case rangeType === 'max' && !!selectedCommercialMaxPrice:
        return `${selectedCommercialMaxPrice} Lac${selectedCommercialMaxPrice === 1 ? '' : 's'}`;
    }
  };

  return (
    <>
      <form
        key={index}
        onSubmit={
          currTabFilter?.tabID.toLowerCase().includes('residential')
            ? residentialHandleSubmit(() => applyAllFiltersHandler(currTabFilter?.tabID))
            : commercialHandleSubmit(() => applyAllFiltersHandler(currTabFilter?.tabID))
        }
      >
        <div className={styles.filterBody}>
          {currTabFilter?.filterButtons?.map(
            (
              currTabType: {
                type: string;
                filterHeading: string | null | undefined;
                maxRangeValue: string;
                minRangeValue: string;
                for: string;
                rs: string;
                allInclusive: string;
                buttons: any[];
              },
              key: React.Key | null | undefined,
            ) => (
              <ul key={`${currTabType?.type + key}`}>
                {currTabType?.type === 'rangeFilter' ? (
                  !(
                    currTabType?.maxRangeValue === currTabType?.minRangeValue || currTabType?.maxRangeValue === '0'
                  ) && (
                    <li className={styles.filterPopup} itemProp="headline">
                      <label itemProp="text">
                        {currTabType?.filterHeading} <span itemProp="text">{currTabType?.allInclusive}</span>
                      </label>
                      <RangeFilter
                        step={1}
                        max={parseInt(currTabType?.maxRangeValue) / 100000}
                        min={parseInt(currTabType?.minRangeValue) / 100000}
                        getprice={
                          currTabFilter?.tabID.toLowerCase().includes('residential')
                            ? getPriceResidential
                            : getPriceCommercial
                        }
                        selectedminrange={getPriceRange(
                          currTabFilter?.tabID.toLowerCase().includes('residential'),
                          currTabType,
                          'min',
                        )}
                        selectedmaxrange={getPriceRange(
                          currTabFilter?.tabID.toLowerCase().includes('residential'),
                          currTabType,
                          'max',
                        )}
                      />
                      <div className={styles.rangeLabels}>
                        <span itemProp="text">
                          {`${currTabType?.rs}${getPriceFilterLabels(
                            currTabFilter?.tabID.toLowerCase().includes('residential'),
                            currTabType,
                            'min',
                          )}`}
                        </span>
                        <span itemProp="text">
                          {`${currTabType?.rs}${getPriceFilterLabels(
                            currTabFilter?.tabID.toLowerCase().includes('residential'),
                            currTabType,
                            'max',
                          )}`}
                        </span>
                      </div>
                    </li>
                  )
                ) : (
                  <li className={styles.filterPopup}>
                    <label itemProp="headline">{currTabType?.filterHeading}</label>
                    <ul className={styles.btnFilterGroup}>
                      <li className={styles.btnGroup}>
                        {currTabType?.buttons.map((itemtype, key: React.Key | null | undefined) => {
                          if (
                            status &&
                            currTabType?.type?.toLowerCase()?.includes('status') &&
                            !itemtype?.controllerName
                              ?.toLowerCase()
                              .includes(status.replaceAll('_', '').toLowerCase().toLowerCase())
                          ) {
                            return;
                          }
                          return (
                            <Controller
                              key={`${currTabFilter?.tabID + key}`}
                              control={
                                currTabFilter?.tabID.toLowerCase().includes('residential')
                                  ? residentialControl
                                  : commercialControl
                              }
                              name={`${currTabFilter?.tabID}${itemtype?.controllerName?.toLowerCase()}`}
                              render={({
                                field: {
                                  onChange,
                                  onBlur,
                                  value = currTabFilter?.tabID.toLowerCase().includes('residential')
                                    ? residentialSelected.propertystatus.includes(
                                        itemtype?.controllerName?.toLowerCase(),
                                      ) &&
                                      residentailSetValue(
                                        `${currTabFilter?.tabID}${itemtype?.controllerName?.toLowerCase()}`,
                                        true,
                                      )
                                    : commercialSelected.propertystatus.includes(
                                        itemtype?.controllerName?.toLowerCase(),
                                      ) &&
                                      commercialSetValue(
                                        `${currTabFilter?.tabID}${itemtype?.controllerName?.toLowerCase()}`,
                                        true,
                                      ),
                                },
                              }) => {
                                return (
                                  <div
                                    className={`${styles.customCheck} ${value === true ? styles.active : ''}`}
                                    onClick={() => {
                                      onChange(!value);
                                      handleButtonClick(
                                        currTabFilter?.tabID?.toLowerCase(),
                                        currTabType?.type?.toLowerCase(),
                                        itemtype?.controllerName?.toLowerCase(),
                                      );
                                    }}
                                  >
                                    <Ripple>
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={itemtype?.buttonLabel}
                                        checked={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        defaultChecked={false}
                                      />
                                      <label className="form-check-label" htmlFor={itemtype?.buttonLabel}>
                                        {itemtype?.buttonLabel?.replace('-', '.')}
                                      </label>
                                    </Ripple>
                                  </div>
                                );
                              }}
                            />
                          );
                        })}
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            ),
          )}
        </div>
        <input type="hidden" id="filterTabType" name="filterTabType" value={currTabFilter?.tabID} />
        <div className={styles.footerSection}>
          <Button variant="outline-secondary" onClick={() => clearAllFiltersHandler(currTabFilter?.tabID)}>
            {clearAllLabel}
          </Button>{' '}
          <Button type="submit">{applyFilterLabel}</Button>
        </div>
      </form>
    </>
  );
};

export default FilterContent;
