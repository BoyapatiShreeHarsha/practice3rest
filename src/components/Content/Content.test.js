import React from "react";
import Cards from '../Card/Cards';
import Filter from '../Filter/Filter'
import mockAxios from "../../__mocks__/mockAxios";
import { BrowserRouter } from "react-router-dom";
import { cleanup, render, screen, waitFor, act } from "@testing-library/react";
import Content from "./Content";

jest.mock("../Card/Cards");
jest.mock("../Filter/Filter");

let allResponseData = [
    {
        "name": {
            "common": "Cyprus",
            "official": "Republic of Cyprus",
            "nativeName": {
                "ell": {
                    "official": "Δημοκρατία της Κύπρος",
                    "common": "Κύπρος"
                },
                "tur": {
                    "official": "Kıbrıs Cumhuriyeti",
                    "common": "Kıbrıs"
                }
            }
        },
        "tld": [
            ".cy"
        ],
        "cca2": "CY",
        "ccn3": "196",
        "cca3": "CYP",
        "cioc": "CYP",
        "independent": true,
        "status": "officially-assigned",
        "unMember": true,
        "currencies": {
            "EUR": {
                "name": "Euro",
                "symbol": "€"
            }
        },
        "idd": {
            "root": "+3",
            "suffixes": [
                "57"
            ]
        },
        "capital": [
            "Nicosia"
        ],
        "altSpellings": [
            "CY",
            "Kýpros",
            "Kıbrıs",
            "Republic of Cyprus",
            "Κυπριακή Δημοκρατία",
            "Kıbrıs Cumhuriyeti"
        ],
        "region": "Europe",
        "subregion": "Southern Europe",
        "languages": {
            "ell": "Greek",
            "tur": "Turkish"
        },
        "translations": {
            "ara": {
                "official": "جمهورية قبرص",
                "common": "قبرص"
            },
            "bre": {
                "official": "Republik Kiprenez",
                "common": "Kiprenez"
            },
            "ces": {
                "official": "Kyperská republika",
                "common": "Kypr"
            },
            "cym": {
                "official": "Gweriniaeth Cyprus",
                "common": "Cyprus"
            },
            "deu": {
                "official": "Republik Zypern",
                "common": "Zypern"
            },
            "est": {
                "official": "Küprose Vabariik",
                "common": "Küpros"
            },
            "fin": {
                "official": "Kyproksen tasavalta",
                "common": "Kypros"
            },
            "fra": {
                "official": "République de Chypre",
                "common": "Chypre"
            },
            "hrv": {
                "official": "Republika Cipar",
                "common": "Cipar"
            },
            "hun": {
                "official": "Ciprusi Köztársaság",
                "common": "Ciprus"
            },
            "ita": {
                "official": "Repubblica di Cipro",
                "common": "Cipro"
            },
            "jpn": {
                "official": "キプロス共和国",
                "common": "キプロス"
            },
            "kor": {
                "official": "키프로스 공화국",
                "common": "키프로스"
            },
            "nld": {
                "official": "Republiek Cyprus",
                "common": "Cyprus"
            },
            "per": {
                "official": "جمهوری قبرس",
                "common": "قِبرِس"
            },
            "pol": {
                "official": "Republika Cypryjska",
                "common": "Cypr"
            },
            "por": {
                "official": "República de Chipre",
                "common": "Chipre"
            },
            "rus": {
                "official": "Республика Кипр",
                "common": "Кипр"
            },
            "slk": {
                "official": "Cyperská republika",
                "common": "Cyprus"
            },
            "spa": {
                "official": "República de Chipre",
                "common": "Chipre"
            },
            "srp": {
                "official": "Кипарска Република",
                "common": "Кипар"
            },
            "swe": {
                "official": "Republiken Cypern",
                "common": "Cypern"
            },
            "tur": {
                "official": "Kıbrıs Cumhuriyeti",
                "common": "Kıbrıs"
            },
            "urd": {
                "official": "جمہوریہ قبرص",
                "common": "قبرص"
            },
            "zho": {
                "official": "塞浦路斯共和国",
                "common": "塞浦路斯"
            }
        },
        "latlng": [
            35.0,
            33.0
        ],
        "landlocked": false,
        "area": 9251.0,
        "demonyms": {
            "eng": {
                "f": "Cypriot",
                "m": "Cypriot"
            },
            "fra": {
                "f": "Chypriote",
                "m": "Chypriote"
            }
        },
        "flag": "🇨🇾",
        "maps": {
            "googleMaps": "https://goo.gl/maps/77hPBRdLid8yD5Bm7",
            "openStreetMaps": "https://www.openstreetmap.org/relation/307787"
        },
        "population": 1207361,
        "gini": {
            "2018": 32.7
        },
        "fifa": "CYP",
        "car": {
            "signs": [
                "CY"
            ],
            "side": "left"
        },
        "timezones": [
            "UTC+02:00"
        ],
        "continents": [
            "Europe"
        ],
        "flags": {
            "png": "https://flagcdn.com/w320/cy.png",
            "svg": "https://flagcdn.com/cy.svg",
            "alt": "The flag of Cyprus has a white field, at the center of which is a copper-colored silhouette of the Island of Cyprus above two green olive branches crossed at the stem."
        },
        "coatOfArms": {
            "png": "https://mainfacts.com/media/images/coats_of_arms/cy.png",
            "svg": "https://mainfacts.com/media/images/coats_of_arms/cy.svg"
        },
        "startOfWeek": "monday",
        "capitalInfo": {
            "latlng": [
                35.17,
                33.37
            ]
        },
        "postalCode": {
            "format": "####",
            "regex": "^(\\d{4})$"
        }
    },
    {
        "name": {
            "common": "Eritrea",
            "official": "State of Eritrea",
            "nativeName": {
                "ara": {
                    "official": "دولة إرتريا",
                    "common": "إرتريا\u200e"
                },
                "eng": {
                    "official": "State of Eritrea",
                    "common": "Eritrea"
                },
                "tir": {
                    "official": "ሃገረ ኤርትራ",
                    "common": "ኤርትራ"
                }
            }
        },
        "tld": [
            ".er"
        ],
        "cca2": "ER",
        "ccn3": "232",
        "cca3": "ERI",
        "cioc": "ERI",
        "independent": true,
        "status": "officially-assigned",
        "unMember": true,
        "currencies": {
            "ERN": {
                "name": "Eritrean nakfa",
                "symbol": "Nfk"
            }
        },
        "idd": {
            "root": "+2",
            "suffixes": [
                "91"
            ]
        },
        "capital": [
            "Asmara"
        ],
        "altSpellings": [
            "ER",
            "State of Eritrea",
            "ሃገረ ኤርትራ",
            "Dawlat Iritriyá",
            "ʾErtrā",
            "Iritriyā"
        ],
        "region": "Africa",
        "subregion": "Eastern Africa",
        "languages": {
            "ara": "Arabic",
            "eng": "English",
            "tir": "Tigrinya"
        },
        "translations": {
            "ara": {
                "official": "دولة إريتريا",
                "common": "إريتريا"
            },
            "bre": {
                "official": "Stad Eritrea",
                "common": "Eritrea"
            },
            "ces": {
                "official": "Stát Eritrea",
                "common": "Eritrea"
            },
            "cym": {
                "official": "Gwladwriaeth Eritrea",
                "common": "Eritrea"
            },
            "deu": {
                "official": "Staat Eritrea",
                "common": "Eritrea"
            },
            "est": {
                "official": "Eritrea Riik",
                "common": "Eritrea"
            },
            "fin": {
                "official": "Eritrean valtio",
                "common": "Eritrea"
            },
            "fra": {
                "official": "État d'Érythrée",
                "common": "Érythrée"
            },
            "hrv": {
                "official": "Država Eritreji",
                "common": "Eritreja"
            },
            "hun": {
                "official": "Eritrea",
                "common": "Eritrea"
            },
            "ita": {
                "official": "Stato di Eritrea",
                "common": "Eritrea"
            },
            "jpn": {
                "official": "エリトリア国",
                "common": "エリトリア"
            },
            "kor": {
                "official": "에리트레아국",
                "common": "에리트레아"
            },
            "nld": {
                "official": "Staat Eritrea",
                "common": "Eritrea"
            },
            "per": {
                "official": "جمهوری اریتره",
                "common": "اریتره"
            },
            "pol": {
                "official": "Państwo Erytrea",
                "common": "Erytrea"
            },
            "por": {
                "official": "Estado da Eritreia",
                "common": "Eritreia"
            },
            "rus": {
                "official": "Государство Эритрея",
                "common": "Эритрея"
            },
            "slk": {
                "official": "Eritrejský štát",
                "common": "Eritrea"
            },
            "spa": {
                "official": "Estado de Eritrea",
                "common": "Eritrea"
            },
            "srp": {
                "official": "Држава Еритреја",
                "common": "Еритреја"
            },
            "swe": {
                "official": "Staten Eritrea",
                "common": "Eritrea"
            },
            "tur": {
                "official": "Eritre Devleti",
                "common": "Eritre"
            },
            "urd": {
                "official": "ریاستِ ارتریا",
                "common": "ارتریا"
            },
            "zho": {
                "official": "厄立特里亚",
                "common": "厄立特里亚"
            }
        },
        "latlng": [
            15.0,
            39.0
        ],
        "landlocked": false,
        "borders": [
            "DJI",
            "ETH",
            "SDN"
        ],
        "area": 117600.0,
        "demonyms": {
            "eng": {
                "f": "Eritrean",
                "m": "Eritrean"
            },
            "fra": {
                "f": "Érythréenne",
                "m": "Érythréen"
            }
        },
        "flag": "🇪🇷",
        "maps": {
            "googleMaps": "https://goo.gl/maps/HRyqUpnPwwG6jY5j6",
            "openStreetMaps": "https://www.openstreetmap.org/relation/296961"
        },
        "population": 5352000,
        "fifa": "ERI",
        "car": {
            "signs": [
                "ER"
            ],
            "side": "right"
        },
        "timezones": [
            "UTC+03:00"
        ],
        "continents": [
            "Africa"
        ],
        "flags": {
            "png": "https://flagcdn.com/w320/er.png",
            "svg": "https://flagcdn.com/er.svg",
            "alt": "The flag of Eritrea comprises three triangles — a large red isosceles triangle with its base spanning the hoist end and its apex at the midpoint on the fly end, and a green and blue right-angled triangle above and beneath the red triangle. On the hoist side of the red triangle is a golden vertical olive branch encircled by a golden olive wreath."
        },
        "coatOfArms": {
            "png": "https://mainfacts.com/media/images/coats_of_arms/er.png",
            "svg": "https://mainfacts.com/media/images/coats_of_arms/er.svg"
        },
        "startOfWeek": "monday",
        "capitalInfo": {
            "latlng": [
                15.33,
                38.93
            ]
        }
    }];

beforeAll(() => {
    mockAxios.reset();
});

afterEach(cleanup);


describe("Test for Content component", () => {
    test("checking the all api", async () => {
        Cards.mockImplementation((name, ...rest) => <div>{name}</div>);
        // const mockAxios = new MockAdapter(axios);
        mockAxios.onGet("/all").reply(200, allResponseData);

        await act(async () => {
            render(<BrowserRouter><Content /></BrowserRouter>);
        });

        // await waitFor(() => expect(screen.queryByText(/Loading/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByTestId("card0")).toBeInTheDocument());

        // // Now, the component should be loaded
        expect(screen.queryByText(/Eritrea/i)).toBeInTheDocument();
    });
});