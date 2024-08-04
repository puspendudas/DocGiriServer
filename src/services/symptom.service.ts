import { CreateSymptomDto } from '@dtos/symptoms.dto';
import { HttpException } from '@exceptions/HttpException';
import SymptomModel from '@models/symptom.model';
import { Symptom } from '@interfaces/symptoms.interface';
import { isEmpty } from '@utils/util';

class SymptomService {
  public symptoms = SymptomModel;

  public async findAllSymptoms(): Promise<Symptom[]> {
    const allSymptoms: Symptom[] = await this.symptoms.find();
    return allSymptoms;
  }

  public async findSymptomById(symptomId: string): Promise<Symptom> {
    if (isEmpty(symptomId)) throw new HttpException(400, 'SymptomId is empty');

    const findSymptom: Symptom = await this.symptoms.findById(symptomId);
    if (!findSymptom) throw new HttpException(409, "Symptom doesn't exist");

    return findSymptom;
  }

  public async createSymptom(symptomData: CreateSymptomDto): Promise<Symptom> {
    if (isEmpty(symptomData)) throw new HttpException(400, 'symptomData is empty');

    const createSymptomData: Symptom = await this.symptoms.create(symptomData);
    return createSymptomData;
  }

  public async updateSymptom(symptomId: string, symptomData: CreateSymptomDto): Promise<Symptom> {
    if (isEmpty(symptomData)) throw new HttpException(400, 'symptomData is empty');

    const findSymptom: Symptom = await this.symptoms.findById(symptomId);
    if (!findSymptom) throw new HttpException(409, "Symptom doesn't exist");

    await this.symptoms.updateOne({ _id: symptomId }, symptomData);

    const updateSymptom: Symptom = await this.symptoms.findById(symptomId);
    return updateSymptom;
  }

  public async deleteSymptom(symptomId: string): Promise<Symptom> {
    if (isEmpty(symptomId)) throw new HttpException(400, "Symptom doesn't existId");

    const findSymptom: Symptom = await this.symptoms.findById(symptomId);
    if (!findSymptom) throw new HttpException(409, "Symptom doesn't exist");

    await this.symptoms.findByIdAndDelete(symptomId);

    return findSymptom;
  }
}

export default SymptomService;
