import ApiResponse from "../utility/apiResponse";
import { IController } from "../interface/IController";
import ApiError from "../utility/apiError";
import path from "path";
import * as csv from "fast-csv";
import { createReadStream } from "fs";

interface ICapitalDetailsRows {
  Capital: string;
  Name: string;
  Business: string;
  Division: string;
  StartAt: Date;
  DueAt: Date;
  CarNumber: string;
  VehicleId: string;
  VehicleName: string;
  RentalPeriod: string;
  ContractedMileage: number;
  Subsidy: number;
  AdvancePay: number;
  AcquisitionOrReturn: string;
  Repair: string;
  PaymentMethod: string;
  PaymentBank: string;
  PaymentAt: number;
  AccountHolder: string;
  DriverAge: number;
  Dedutible: number;
  IndemnityReturn: number;
  IndemnityTotalLoss: number;
  CompulsorySubscription: string;
  Phone: string;
  Email: string;
}

export default class indexController {
  static indexPage: IController = async (req, res) => {
    try {
      const tmpFile = req.file;
      const titleRows = [
        "Capital",
        "Name",
        "Business",
        "Division",
        "StartAt",
        "DueAt",
        "CarNumber",
        "VehicleId",
        "VehicleName",
        "RentalPeriod",
        "ContractedMileage",
        "Subsidy",
        "AdvancePay",
        "AcquisitionOrReturn",
        "Repair",
        "PaymentMethod",
        "PaymentBank",
        "PaymentAt",
        "AccountHolder",
        "DriverAge",
        "Dedutible",
        "IndemnityReturn",
        "IndemnityTotalLoss",
        "CompulsorySubscription",
        "Phone",
        "Email"
      ];
      if (tmpFile) {
        const filePath = path.join(__dirname, "../../", tmpFile.path);

        // ex 1
        // createReadStream(filePath)
        //   .pipe(csv.parse({ headers: titleRows, skipRows: 1 }))
        //   .on("error", error => console.error(error))
        //   .on("data", row => console.log(row))
        //   .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

        // ex 2
        createReadStream(filePath)
          .pipe(csv.parse({ headers: titleRows, skipRows: 1 }))
          .pipe(csv.format<ICapitalDetailsRows, ICapitalDetailsRows>({ headers: titleRows }))
          .transform((row, next): void => {
            try {
              // insert
              console.log(row);
              next(null, row);
            } catch (error: any) {
              next(error);
            }
          });
      }
      ApiResponse.init(res);
    } catch (error: any) {
      console.log(error);
      ApiError.regist(error);
      ApiResponse.error(res, error);
    }
  };
}
