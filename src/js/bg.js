/*
 * bg.js
 * Copyright (C) 2023 Element Davv<elementdavv@hotmail.com>
 *
 * Distributed under terms of the GPL3 license.
 */

(() => {
    'use strict';

    const getOption = () => {
        const domain = 'archive.org';
        const origin = 'https://archive.org';
        const ruleid = 6984;

        return  {
            removeRuleIds: [ruleid]
            , addRules: [
                {
                    id: ruleid
                    , priority: 1
                    , condition: {
                        initiatorDomains: [domain]
                    }
                    , action: {
                        type: 'modifyHeaders'
                        , responseHeaders: [
                            {
                                header: 'Access-Control-Allow-Origin'
                                , operation: 'set'
                                , value: origin
                            }
                            , {
                                header: 'Access-Control-Allow-Credentials'
                                , operation: 'set'
                                , value: 'true'
                            }
                        ]
                    }
                }
            ]
        };
    }

    if (chrome.declarativeNetRequest) {
        chrome.declarativeNetRequest.updateSessionRules(getOption())
            .catch(e=>console.error(e));
    }

})();
