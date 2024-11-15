import dayjs from "dayjs";
import { getDataInJSON, getDataInArray } from "../utils/functions";
import { convertGroupDates } from "../utils/daysFnc";

export class GoogleSheet {
  constructor(props) {
    this.sheetId = props.sheetId;
    this.rowHead = props.rowHead;
    this.nameSheet = props.nameSheet;
    this.range = `${props.nameSheet}!A${this.rowHead}:ZZZ`;
  }
  async getResponse() {
    try {
      const { result } = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: this.range,
        dateTimeRenderOption: "FORMATTED_STRING",
        valueRenderOption: "UNFORMATTED_VALUE",
      });
      return result;
    } catch (e) {
      window.alert(
        `${this.nameSheet, this.range} - Code: ${e.result.error.code}, Message: ${e.result.error.message}`
      );
      console.log(e)
      return e.result;
    }
  }
  async getData() {
    try {
      const result = await this.getResponse();
      return getDataInJSON(result.values);
    } catch (e) {
      console.log(e);
    }
  }
  async getHeaders() {
    try {
      const result = await this.getResponse();
      if (!result.error) {
        const headers = result.values[0];
        return headers.map((item) => item.toLocaleLowerCase());
      }
    } catch (e) {
      console.error("Problems with getHeaders", e);
    }
  }
  async postData(data) {
    data.fecha_creacion = dayjs(new Date(), "YYYY-DD-MM").format("YYYY-MM-DD");
    convertGroupDates(data, "en-es");
    const headers = await this.getHeaders();
    if (headers) {
      const newData = getDataInArray(data, headers);
      try {
        let { result, status } =
          await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: this.sheetId,
            range: this.range,
            includeValuesInResponse: true,
            insertDataOption: "INSERT_ROWS",
            responseDateTimeRenderOption: "FORMATTED_STRING",
            responseValueRenderOption: "FORMATTED_VALUE",
            valueInputOption: "USER_ENTERED",
            resource: {
              majorDimension: "ROWS",
              range: "",
              values: [newData],
            },
          });
        if (result.error) {
          throw new Error(
            `Code: ${result.error.code} | Message: ${result.error.message}`
          );
        }
        return { result, status };
      } catch (e) {
        console.log("Problems with postData", e);
      }
    }
  }
  async updateData({ colName, id, values }) {
    console.log(values);
    convertGroupDates(values, "en-es");
    let dataUpdate = [];
    try {
      const data = await this.getData();
      const index = data.findIndex((item) => item[colName] === id);
      console.log("index", index);
      if (index >= 0) {
        const row = index + this.rowHead + 1;
        for (let item in values) {
          dataUpdate.push({
            row: row,
            column: this.getNumCol(item, data),
            value: values[item],
          });
        }
        const dataPost = new Array();
        for (let item of dataUpdate) {
          if (item.column > 0) {
            dataPost.push({
              majorDimension: "ROWS",
              range: `${this.nameSheet}!R${item.row}C${item.column}`,
              values: [[item.value]],
            });
          }
        }
        try {
          const { result, status } =
            await gapi.client.sheets.spreadsheets.values.batchUpdate({
              spreadsheetId: this.sheetId,
              resource: {
                data: dataPost,
                includeValuesInResponse: false,
                responseDateTimeRenderOption: "FORMATTED_STRING",
                responseValueRenderOption: "FORMATTED_VALUE",
                valueInputOption: "USER_ENTERED",
              },
            });
          if (result.error) {
            throw new Error(
              `Code: ${result.error.code} | Message: ${result.error.message}`
            );
          }
          return { status };
        } catch (e) {
          console.log(e);
        }
      } else {
        console.error("No se encontró la fila");
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getLastId() {
    const data = await this.getData();
    const Ids = data.map(item => item.id);
    return Math.max(...Ids) || 0;
  }
  getNumCol(key, array) {
    let newArray = array[0];
    newArray = Object.keys(newArray);
    return newArray.indexOf(key) + 1;
  }
}
export class Email {
  static async getEmail() {
    try {
      let response = await gapi.client.gmail.users.getProfile({
        userId: "me",
      });
      return response.result.emailAddress;
    } catch (e) {
      console.log(e);
    }
  }
}
