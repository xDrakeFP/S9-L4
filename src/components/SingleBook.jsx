import { Component } from "react";
import { Card } from "react-bootstrap";
import CommentArea from "./CommentArea";

class SingleBook extends Component {
    render() {
        const { book, isSelected, onSelect, onClose } = this.props;
        return (
            <>
                <Card
                    onClick={onSelect}
                    style={{
                        border: isSelected ? "3px solid red" : "none",
                    }}
                >
                    <Card.Img variant="top" src={book.img} />
                    <Card.Body>
                        <Card.Title style={{ color: "black" }}>{book.title}</Card.Title>
                    </Card.Body>
                </Card>
                {isSelected && <CommentArea title={book.title} asin={book.asin} onClose={onClose} show="true" />}
            </>
        );
    }
}

export default SingleBook;
