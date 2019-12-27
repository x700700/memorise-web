import React from "react";
import {useTranslation} from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

const ListScrollable = ({ isFetching, list, listClass, item, itemName, fetchMoreData, hasMore, search }) => {
    const { t } = useTranslation();

    const compItem = (x) => {
        const props = {};
        props[itemName] = x;
        return React.createElement(item, props);
    };

    return (
        <InfiniteScroll
            dataLength={list ? list.length : 0}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading More...</h4>}
        >
            <div className={listClass}>
                {list && list.map((x, i) => {
                    return (
                        <div key={`smartlink-${i}`}>
                            {compItem(x)}
                        </div>);
                })}
            </div>
            {!isFetching && search && list && list.length === 0 &&
            <div>
                "{search}" {t('not found')}.
            </div>
            }
        </InfiniteScroll>
    );
};
export default ListScrollable;
