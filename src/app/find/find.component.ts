import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { FormGroup } from '@angular/forms';

const ADD_BOOKS = gql`
  mutation addBooksDetails($title: String!, $description: String!) {
    addBooks(title: $title, description: $description) {
      message
    }
  }
`;
@Component({
  selector: "app-find",
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.css"]
})
export class FindComponent {
  bookId: string;
  book: any = {};
  loading = false;
  error: string;
  form: FormGroup;
  constructor(private apollo: Apollo) {}

  onClickSubmit(data) {
    this.apollo.mutate({
      mutation: ADD_BOOKS,
      variables: {
        title: data.bookName,
        description: data.bookDesc
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
