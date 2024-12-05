import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor() {}

  async takePicture(source: CameraSource = CameraSource.Camera): Promise<string | null>{
    try{
      const image: Photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source,
      });
      
      return image.dataUrl || null;
    } catch (error){
      console.error('Error al capturar la imagen:', error);
      return null;
    }
  } 
}