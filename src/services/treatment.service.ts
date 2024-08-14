import { CreateTreatmentDto } from '@dtos/treatments.dto';
import { HttpException } from '@exceptions/HttpException';
import TreatmentModel from '@models/treatment.model';
import SymptomModel from '@models/symptom.model'; // Import Symptom model
import { Treatment, TreatmentDocument } from '@interfaces/treatment.model';
import { Symptom } from '@interfaces/symptoms.interface';
import { isEmpty } from '@utils/util';

class TreatmentService {
  public treatments = TreatmentModel;
  public symptoms = SymptomModel;

  public async findAllTreatments(): Promise<Treatment[]> {
    const allTreatments: Treatment[] = await this.treatments.find();
    return allTreatments;
  }

  public async findTreatmentById(treatmentId: string): Promise<Treatment> {
    if (isEmpty(treatmentId)) throw new HttpException(400, 'TreatmentId is empty');

    const findTreatment: Treatment = await this.treatments.findById(treatmentId);
    if (!findTreatment) throw new HttpException(409, "Treatment doesn't exist");

    return findTreatment;
  }

  public async createTreatment(treatmentData: CreateTreatmentDto): Promise<Treatment> {
    if (isEmpty(treatmentData)) throw new HttpException(400, 'treatmentData is empty');

    // Create the new treatment
    const createTreatmentData: TreatmentDocument = await this.treatments.create(treatmentData);

    // Update the associated symptoms with this treatment's ID
    if (treatmentData.associatedSymptoms && treatmentData.associatedSymptoms.length > 0) {
      await this.symptoms.updateMany(
        { _id: { $in: treatmentData.associatedSymptoms } },
        { $push: { possibleTreatments: createTreatmentData._id } }
      );
    }

    return createTreatmentData;
  }

  public async updateTreatment(treatmentId: string, treatmentData: CreateTreatmentDto): Promise<Treatment> {
    if (isEmpty(treatmentData)) throw new HttpException(400, 'treatmentData is empty');

    const findTreatment: Treatment = await this.treatments.findById(treatmentId);
    if (!findTreatment) throw new HttpException(409, "Treatment doesn't exist");

    await this.treatments.updateOne({ _id: treatmentId }, treatmentData);

    const updateTreatment: Treatment = await this.treatments.findById(treatmentId);
    return updateTreatment;
  }

  public async deleteTreatment(treatmentId: string): Promise<Treatment> {
    if (isEmpty(treatmentId)) throw new HttpException(400, "Treatment doesn't existId");

    const findTreatment: Treatment = await this.treatments.findById(treatmentId);
    if (!findTreatment) throw new HttpException(409, "Treatment doesn't exist");

    await this.treatments.findByIdAndDelete(treatmentId);

    return findTreatment;
  }
}

export default TreatmentService;
