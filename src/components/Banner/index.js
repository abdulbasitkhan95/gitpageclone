import {Col, Container, Row} from "react-bootstrap";

function Banner(props) {
        return(
            <>
                <div className="mainBann">
                    <Container>
                        <Row>
                            <Col md="12" className="text-center">
                                <h1>{props._heading}</h1>
                                <p>{props._para}</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
}

export default Banner