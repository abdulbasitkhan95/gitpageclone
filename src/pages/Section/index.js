import SingleRepo from "../../components/SingleRepo";
import SingleDev from "../../components/SingleDev";
import {useState, useEffect} from "react";
import Navbar from "../../components/Navbar";
import Filters from "../../components/Filters";
import Banner from "../../components/Banner";
import githubTrends from 'github-trends-api';
import { GetRequest } from "../../apiRequest"
import {Col, Container, Row} from "react-bootstrap";

function Section(props) {
    const repoPara = "See what the GitHub community is most excited about today."
    const devPara = "These are the developers building the hot tools today."
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState([]);
    // const [languageValue, setLanguageValue] = useState();
    const [tabState, setTabState] = useState('repo')
    const [progFilter, setProgFilter] = useState('');
    const [secTrendMain, setSecTrendMain] = useState('repositories');
    const [planguage, setPLanguage] = useState('');
    const [date, setDate] = useState('');
    const [lang, setLang] = useState('');
    const [changeState, setChangeState] = useState(false);
    let tempObj = {}

    useEffect(async () => {
        try {
            await GetRequest(tempObj, secTrendMain+'/'+planguage)
                .then(function (response) {
                    setShowResults(response.data)
                })
        }
        catch (e) {
            console.log(e)
        }
    }, []);

    useEffect(async () => {
        setShowResults([])
        if(date) tempObj.since=date;
        if(lang) tempObj.spoken_lang=lang;
        try {
            await GetRequest(tempObj, secTrendMain+'/'+planguage)
                .then(function (response) {
                    setShowResults(response.data)
                    //console.log(response.data)
                })
        }
        catch (e) {
            console.log(e)
        }
    }, [changeState]);

    const tabChange = e => {
        setTabState(e)
        setPLanguage('')
        if(e === 'dev') {
            setSecTrendMain('developers')
        }
        else {
            setSecTrendMain('repositories')
        }
        setChangeState(!changeState)
    }

    const selectTriggered = e => {
        setPLanguage(e.plang !== undefined ? e.plang : "" )
        setDate(e.date !== undefined ? e.date : "" )
        setLang(e.lang !== undefined ? e.lang : ""  )
        setChangeState(!changeState)

    }


    return(
        <>
            <Banner
                _heading="Trending"
                _para={
                    tabState === "repo"
                    ?
                    repoPara
                    :
                    tabState === "dev"
                    ?
                    devPara
                    :
                    " "
                }
            />
            <section className="detail-sec">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="box">
                                <div className="box-header">
                                    <Navbar navClick={tabChange} />
                                    <Filters tabState={tabState} selectChange={selectTriggered}/>
                                </div>
                                <div className="box-detail">
                                    {
                                        tabState === 'repo'
                                        ?
                                        showResults.map((item, index) => {
                                            return(
                                                <SingleRepo key={index} data={item}/>
                                            )
                                        })
                                        :
                                        tabState === 'dev'
                                        ?
                                            showResults.map((item, index) => {
                                                return(
                                                    <SingleDev key={index} data={item}/>
                                                )
                                            })
                                        :
                                            ""
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Section