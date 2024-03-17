import React from "react";
import Cards from '../Card/Cards';
import mockAxios from "../../__mocks__/mockAxios";
import { BrowserRouter } from "react-router-dom";
import { cleanup, render, screen, waitFor, act, fireEvent, within } from "@testing-library/react";
import Content from "./Content";
import _ from 'lodash';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom')),
    useNavigate: () => mockedUsedNavigate,
}))

jest.mock("../Card/Cards");

jest.mock('lodash', () => ({
    ...jest.requireActual('lodash'),
    debounce: jest.fn((fn) => fn),
}))

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

let nameResponseData = [
    {
        "name": {
            "common": "Belgium",
            "official": "Kingdom of Belgium",
            "nativeName": {
                "deu": {
                    "official": "Königreich Belgien",
                    "common": "Belgien"
                },
                "fra": {
                    "official": "Royaume de Belgique",
                    "common": "Belgique"
                },
                "nld": {
                    "official": "Koninkrijk België",
                    "common": "België"
                }
            }
        },
        "tld": [
            ".be"
        ],
        "cca2": "BE",
        "ccn3": "056",
        "cca3": "BEL",
        "cioc": "BEL",
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
                "2"
            ]
        },
        "capital": [
            "Brussels"
        ],
        "altSpellings": [
            "BE",
            "België",
            "Belgie",
            "Belgien",
            "Belgique",
            "Kingdom of Belgium",
            "Koninkrijk België",
            "Royaume de Belgique",
            "Königreich Belgien"
        ],
        "region": "Europe",
        "subregion": "Western Europe",
        "languages": {
            "deu": "German",
            "fra": "French",
            "nld": "Dutch"
        },
        "translations": {
            "ara": {
                "official": "مملكة بلجيكا",
                "common": "بلجيكا"
            },
            "bre": {
                "official": "Rouantelezh Belgia",
                "common": "Belgia"
            },
            "ces": {
                "official": "Belgické království",
                "common": "Belgie"
            },
            "cym": {
                "official": "Teyrnas Gwlad Belg",
                "common": "Gwlad Belg"
            },
            "deu": {
                "official": "Königreich Belgien",
                "common": "Belgien"
            },
            "est": {
                "official": "Belgia Kuningriik",
                "common": "Belgia"
            },
            "fin": {
                "official": "Belgian kuningaskunta",
                "common": "Belgia"
            },
            "fra": {
                "official": "Royaume de Belgique",
                "common": "Belgique"
            },
            "hrv": {
                "official": "Kraljevina Belgija",
                "common": "Belgija"
            },
            "hun": {
                "official": "Belga Királyság",
                "common": "Belgium"
            },
            "ita": {
                "official": "Regno del Belgio",
                "common": "Belgio"
            },
            "jpn": {
                "official": "ベルギー王国",
                "common": "ベルギー"
            },
            "kor": {
                "official": "벨기에 왕국",
                "common": "벨기에"
            },
            "nld": {
                "official": "Koninkrijk België",
                "common": "België"
            },
            "per": {
                "official": "پادشاهی بلژیک",
                "common": "بلژیک"
            },
            "pol": {
                "official": "Królestwo Belgii",
                "common": "Belgia"
            },
            "por": {
                "official": "Reino da Bélgica",
                "common": "Bélgica"
            },
            "rus": {
                "official": "Королевство Бельгия",
                "common": "Бельгия"
            },
            "slk": {
                "official": "Belgické kráľovstvo",
                "common": "Belgicko"
            },
            "spa": {
                "official": "Reino de Bélgica",
                "common": "Bélgica"
            },
            "srp": {
                "official": "Краљевина Белгија",
                "common": "Белгија"
            },
            "swe": {
                "official": "Konungariket Belgien",
                "common": "Belgien"
            },
            "tur": {
                "official": "Belçika Krallığı",
                "common": "Belğika"
            },
            "urd": {
                "official": "مملکتِ بلجئیم",
                "common": "بلجئیم"
            },
            "zho": {
                "official": "比利时王国",
                "common": "比利时"
            }
        },
        "latlng": [
            50.83333333,
            4.0
        ],
        "landlocked": false,
        "borders": [
            "FRA",
            "DEU",
            "LUX",
            "NLD"
        ],
        "area": 30528.0,
        "demonyms": {
            "eng": {
                "f": "Belgian",
                "m": "Belgian"
            },
            "fra": {
                "f": "Belge",
                "m": "Belge"
            }
        },
        "flag": "🇧🇪",
        "maps": {
            "googleMaps": "https://goo.gl/maps/UQQzat85TCtPRXAL8",
            "openStreetMaps": "https://www.openstreetmap.org/relation/52411"
        },
        "population": 11555997,
        "gini": {
            "2018": 27.2
        },
        "fifa": "BEL",
        "car": {
            "signs": [
                "B"
            ],
            "side": "right"
        },
        "timezones": [
            "UTC+01:00"
        ],
        "continents": [
            "Europe"
        ],
        "flags": {
            "png": "https://flagcdn.com/w320/be.png",
            "svg": "https://flagcdn.com/be.svg",
            "alt": "The flag of Belgium is composed of three equal vertical bands of black, yellow and red."
        },
        "coatOfArms": {
            "png": "https://mainfacts.com/media/images/coats_of_arms/be.png",
            "svg": "https://mainfacts.com/media/images/coats_of_arms/be.svg"
        },
        "startOfWeek": "monday",
        "capitalInfo": {
            "latlng": [
                50.83,
                4.33
            ]
        },
        "postalCode": {
            "format": "####",
            "regex": "^(\\d{4})$"
        }
    }
]

let regionResponseData = [
    {
        "name": {
            "common": "Liberia",
            "official": "Republic of Liberia",
            "nativeName": {
                "eng": {
                    "official": "Republic of Liberia",
                    "common": "Liberia"
                }
            }
        },
        "tld": [
            ".lr"
        ],
        "cca2": "LR",
        "ccn3": "430",
        "cca3": "LBR",
        "cioc": "LBR",
        "independent": true,
        "status": "officially-assigned",
        "unMember": true,
        "currencies": {
            "LRD": {
                "name": "Liberian dollar",
                "symbol": "$"
            }
        },
        "idd": {
            "root": "+2",
            "suffixes": [
                "31"
            ]
        },
        "capital": [
            "Monrovia"
        ],
        "altSpellings": [
            "LR",
            "Republic of Liberia"
        ],
        "region": "Africa",
        "subregion": "Western Africa",
        "languages": {
            "eng": "English"
        },
        "translations": {
            "ara": {
                "official": "جمهورية ليبيريا",
                "common": "ليبيريا"
            },
            "bre": {
                "official": "Republik Liberia",
                "common": "Liberia"
            },
            "ces": {
                "official": "Liberijská republika",
                "common": "Libérie"
            },
            "cym": {
                "official": "Republic of Liberia",
                "common": "Liberia"
            },
            "deu": {
                "official": "Republik Liberia",
                "common": "Liberia"
            },
            "est": {
                "official": "Libeeria Vabariik",
                "common": "Libeeria"
            },
            "fin": {
                "official": "Liberian tasavalta",
                "common": "Liberia"
            },
            "fra": {
                "official": "République du Libéria",
                "common": "Liberia"
            },
            "hrv": {
                "official": "Republika Liberija",
                "common": "Liberija"
            },
            "hun": {
                "official": "Libériai Köztársaság",
                "common": "Libéria"
            },
            "ita": {
                "official": "Repubblica di Liberia",
                "common": "Liberia"
            },
            "jpn": {
                "official": "リベリア共和国",
                "common": "リベリア"
            },
            "kor": {
                "official": "라이베리아 공화국",
                "common": "라이베리아"
            },
            "nld": {
                "official": "Republiek Liberia",
                "common": "Liberia"
            },
            "per": {
                "official": "جمهوری لیبریا",
                "common": "لیبـِریا"
            },
            "pol": {
                "official": "Republika Liberii",
                "common": "Liberia"
            },
            "por": {
                "official": "República da Libéria",
                "common": "Libéria"
            },
            "rus": {
                "official": "Республика Либерия",
                "common": "Либерия"
            },
            "slk": {
                "official": "Libérijská republika",
                "common": "Libéria"
            },
            "spa": {
                "official": "República de Liberia",
                "common": "Liberia"
            },
            "srp": {
                "official": "Република Либерија",
                "common": "Либерија"
            },
            "swe": {
                "official": "Republiken Liberia",
                "common": "Liberia"
            },
            "tur": {
                "official": "Liberya Cumhuriyeti",
                "common": "Liberya"
            },
            "urd": {
                "official": "جمہوریہ لائبیریا",
                "common": "لائبیریا"
            },
            "zho": {
                "official": "利比里亚共和国",
                "common": "利比里亚"
            }
        },
        "latlng": [
            6.5,
            -9.5
        ],
        "landlocked": false,
        "borders": [
            "GIN",
            "CIV",
            "SLE"
        ],
        "area": 111369.0,
        "demonyms": {
            "eng": {
                "f": "Liberian",
                "m": "Liberian"
            },
            "fra": {
                "f": "Libérienne",
                "m": "Libérien"
            }
        },
        "flag": "🇱🇷",
        "maps": {
            "googleMaps": "https://goo.gl/maps/4VsHsc2oeGeRL3wg6",
            "openStreetMaps": "https://www.openstreetmap.org/relation/192780"
        },
        "population": 5057677,
        "gini": {
            "2016": 35.3
        },
        "fifa": "LBR",
        "car": {
            "signs": [
                "LB"
            ],
            "side": "right"
        },
        "timezones": [
            "UTC"
        ],
        "continents": [
            "Africa"
        ],
        "flags": {
            "png": "https://flagcdn.com/w320/lr.png",
            "svg": "https://flagcdn.com/lr.svg",
            "alt": "The flag of Liberia is composed of eleven equal horizontal bands of red alternating with white. A blue square bearing a five-pointed white star is superimposed in the canton."
        },
        "coatOfArms": {
            "png": "https://mainfacts.com/media/images/coats_of_arms/lr.png",
            "svg": "https://mainfacts.com/media/images/coats_of_arms/lr.svg"
        },
        "startOfWeek": "monday",
        "capitalInfo": {
            "latlng": [
                6.3,
                -10.8
            ]
        },
        "postalCode": {
            "format": "####",
            "regex": "^(\\d{4})$"
        }
    }
]

beforeEach(() => {
    mockAxios.reset();
});

afterEach(cleanup);


describe("Test for Content component", () => {
    test("checking the all api", async () => {

        Cards.mockImplementation(({ name, ...rest }) => <div>{name}</div>);
        mockAxios.onGet("/all").reply(200, allResponseData);

        render(<BrowserRouter><Content /></BrowserRouter>);

        await waitFor(() => expect(screen.queryByText(/Loading/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByTestId("card0")).toBeInTheDocument());

        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Eritrea/i)).toBeInTheDocument();
    });

    test(" on search we should get the data", async () => {

        Cards.mockImplementation(({ name, ...rest }) => <div>{name}</div>);

        mockAxios.onGet("/name/belgium").reply(200, nameResponseData);

        render(<BrowserRouter><Content /></BrowserRouter>);
        await act(async () => {
            const searchBarEle = screen.getByTestId("searchBar");
            fireEvent.change(searchBarEle, { target: { value: "belgium" } });
        });

        await waitFor(() => expect(screen.queryByTestId("card0")).toBeInTheDocument());
        expect(screen.queryByText(/Belgium/i)).toBeInTheDocument();

    });

    test.skip(" on select the autocomplete get the data", async () => {

        Cards.mockImplementation(({ name, ...rest }) => <div>{name}</div>);
        mockAxios.onGet("/region/africa").reply(200, regionResponseData);

        render(<BrowserRouter><Content /></BrowserRouter>);
        await act(async () => {
            const autocomplete = screen.getByTestId('autoComplete');

            const input = screen.getByTestId("autoCompleteInput");
            autocomplete.focus();
            fireEvent.change(input, { target: { value: 'africa' } });
            fireEvent.keyDown(autocomplete, { key: 'Enter' });
            await waitFor(() => expect(input).toHaveValue('africa'));

        });

        await waitFor(() => expect(screen.queryByTestId("card0")).toBeInTheDocument());
        expect(screen.queryByText(/Liberia/i)).toBeInTheDocument();

    })

    test(" need to go to /country on clicking card", async () => {
        Cards.mockImplementation(({ name, ...rest }) => <div>{name}</div>);

        mockAxios.onGet("/all").reply(200, allResponseData);

        let setData = jest.fn();

        render(<BrowserRouter><Content setData={setData} /></BrowserRouter>);

        await waitFor(() => expect(screen.queryByText(/Loading/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByTestId("card0")).toBeInTheDocument());
        const cardEle = screen.queryByTestId("card0");
        fireEvent.click(cardEle);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/country");

    })
});