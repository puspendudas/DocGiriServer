import { pick } from 'lodash';

class ConvertResponds {
  public async convertArray<TDesired>(originalResponses: Record<string, any>[]): Promise<TDesired[]> {
    return Promise.all(originalResponses.map(item => this.convertSingle<TDesired>(item)));
  }

  public async convertSingle<TDesired>(originalResponse: Record<string, any>): Promise<TDesired> {
    console.log(originalResponse)
    return new Promise<TDesired>((resolve) => {
      const desiredResponse: TDesired = pick(originalResponse, Object.keys({} as TDesired)) as TDesired;

      console.log(desiredResponse)

      resolve(desiredResponse);
    });
  }
}

export default ConvertResponds;
