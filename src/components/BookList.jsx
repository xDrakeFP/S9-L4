import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";

class BookList extends Component {
    state = {
        searchQuery: "",
        selectedAsin: null,
    };
    closeCommentArea = () => {
        this.setState({ selectedAsin: null });
    };

    render() {
        return (
            <>
                <Row className="justify-content-center mt-5">
                    <Col xs={12} md={4} className="text-center">
                        <Form.Group>
                            <Form.Control
                                type="search"
                                placeholder="Cerca un libro"
                                value={this.state.searchQuery}
                                onChange={(e) =>
                                    this.setState({
                                        searchQuery: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="g-2 mt-3">
                    {this.props.books
                        .filter((b) => b.title.toLowerCase().includes(this.state.searchQuery))
                        .map((b) => (
                            <Col xs={12} md={4} key={b.asin}>
                                <SingleBook
                                    book={b}
                                    isSelected={this.state.selectedAsin === b.asin}
                                    onSelect={() =>
                                        this.setState({
                                            selectedAsin: this.state.selectedAsin === b.asin ? null : b.asin,
                                        })
                                    }
                                    onClose={this.closeCommentArea}
                                />
                            </Col>
                        ))}
                </Row>
            </>
        );
    }
}

export default BookList;
