import { Component } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class CommentArea extends Component {
    state = {
        comments: [],
    };
    componentDidMount() {
        this.getComments();
    }
    getComments = () => {
        fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
            headers: {
                "Content-type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzdlZTc4Y2RkZjAwMTU1ZDY3YWIiLCJpYXQiOjE3NTIyMjE2NzgsImV4cCI6MTc1MzQzMTI3OH0.AtlXCgvBIHI1F43mYHdwk227UegyzevWx_wR43wCu2s",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Errore nel recupero dei dati dei commenti" + res.status);
                }
            })
            .then((arrayRecensioni) => {
                console.log("Array dei commenti arrivato!", arrayRecensioni);
                this.setState({ comments: arrayRecensioni });
            })

            .catch((err) => {
                console.log("Errore", err);
            });
    };

    render() {
        return (
            <Card className={`comment-sidebar ${this.props.show ? "" : "hidden"}`}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h4>{this.props.title}</h4>
                    <button className="btn btn-sm btn-outline-secondary" onClick={this.props.onClose}>
                        ✕
                    </button>
                </Card.Header>
                <ListGroup variant="flush">
                    {this.state.comments.length > 0 ? (
                        this.state.comments.map((comment) => (
                            <ListGroupItem key={comment._id}>
                                <p>
                                    <strong>Autore:</strong> {comment.author}
                                </p>
                                <p>
                                    <strong>Commento:</strong> {comment.comment}
                                </p>
                                <p>
                                    <strong>Voto:</strong> {comment.rate} ⭐
                                </p>
                                <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                                    <strong>ID libro:</strong> {comment.elementId}
                                </p>
                            </ListGroupItem>
                        ))
                    ) : (
                        <ListGroupItem>Nessun commento disponibile.</ListGroupItem>
                    )}
                </ListGroup>
            </Card>
        );
    }
}

export default CommentArea;
