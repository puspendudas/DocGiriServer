import { CreateSymptomDto } from '@dtos/symptoms.dto';
import { HttpException } from '@exceptions/HttpException';
import SymptomModel from '@models/symptom.model';
import { Symptom, SymptomDocument } from '@interfaces/symptoms.interface';
import { isEmpty } from '@utils/util';

class SymptomService {
  public symptoms = SymptomModel;

  public async findAllSymptoms(): Promise<Symptom[]> {
    const allSymptoms: Symptom[] = await this.symptoms.find({ parent: null });
    return allSymptoms;
  }

  public async findSymptomById(symptomId: string): Promise<Symptom> {
    if (isEmpty(symptomId)) throw new HttpException(400, 'SymptomId is empty');

    const findSymptom: Symptom = await this.symptoms.findById(symptomId).populate('children');
    if (!findSymptom) throw new HttpException(409, "Symptom doesn't exist");

    return findSymptom;
  }

  public async findChildrenSymptoms(symptomId: string): Promise<Symptom[]> {
    if (isEmpty(symptomId)) throw new HttpException(400, 'SymptomId is empty');

    const symptom = await this.symptoms.findById(symptomId).populate('children');
    if (!symptom) throw new HttpException(409, "Symptom doesn't exist");

    return symptom.children;
  }

  public async getSymptomTreatment(symptomId: string): Promise<Symptom | null> {
    if (isEmpty(symptomId)) throw new HttpException(400, 'SymptomId is empty');

    const symptom = await this.symptoms.findById(symptomId).populate('possibleTreatments');
    if (!symptom) throw new HttpException(409, "Symptom doesn't exist");

    // If the symptom has children, return the children
    if (symptom.children && symptom.children.length > 0) {
      return null;
    }

    // If no children, return the treatment
    return symptom;
  }

  public async createSymptom(symptomData: CreateSymptomDto): Promise<Symptom> {
    if (isEmpty(symptomData)) throw new HttpException(400, 'symptomData is empty');

    // Create the new symptom
    const createSymptomData: SymptomDocument = await this.symptoms.create(symptomData);

    // If the symptom has a parent, update the parent's children array
  if (createSymptomData.parent) {
    await this.symptoms.findByIdAndUpdate(
      createSymptomData.parent,
      { $push: { children: createSymptomData._id } }
    );
  }

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
