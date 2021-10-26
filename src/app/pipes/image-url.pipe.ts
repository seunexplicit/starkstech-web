import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  constructor(private http: HttpClient) { }

    async transform(src: string, dataType:string="file"): Promise < any > {
      
      try {
       

        const headers = new HttpHeaders({
          Authorization: `Bearer ${localStorage.jwt}`,
        });

        const imageData:any = await this.http
          .get(src, { headers })
          .toPromise();

        if (dataType == 'name') {
          return {
            name: imageData.data[0]?.originalName,
            contentType: imageData.data[0]?.contentType
          }
        }

        return URL.createObjectURL(
          new Blob(
            [new Uint8Array(imageData.data[0]?.Body.data)],
            { type: imageData.data[0]?.contentType }
          )
        )
        /*const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imageBlob);
        });*/
      } catch {
        return "assets/imgs/warning-icon.png";
      }
    }
  

}
