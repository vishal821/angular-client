import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

const GET_BOOKS = gql`
  query fetchBooksDetails {
    getBooksList {
      title
      description
    }
  }
`;
const FILE_UPLOAD = gql`
  mutation upload($file: Upload!, $name: String) {
    upload(file: $file, name: $name) {
      message
    }
  }
`;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  books: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .query<any>({
        query: GET_BOOKS,
        context: {
          headers: {
            token: "123465798jhgjhgsajhja321654",
            "Cache-Control": "no-cache",
          },
        },
      })
      .subscribe(
        ({ data, loading }) => {
          console.log(data);
          this.books = data && data.getBooksList;
          this.loading = loading;
        },
        (error) => {
          this.loading = false;
          this.error = error;
        }
      );
  }

  getAuthorNames(authors) {
    if (authors && authors.length > 1)
      return authors.reduce((acc, cur) => acc.name + ", " + cur.name);
    else return "";
  }
  upload($event) {
    console.log($event.target.files[0]);
    this.apollo
      .mutate<any>({
        mutation: FILE_UPLOAD,
        variables: {
          file: $event.target.files[0],
          name: $event.target.files[0].name,
        },
        context: {
          useMultipart: true,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          this.loading = false;
          this.error = error;
        }
      );
  }
}
