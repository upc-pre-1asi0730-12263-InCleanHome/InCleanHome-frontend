/**
 * Document upload service (employee onboarding).
 * Layer: IAM / application
 */
import { AuthApi } from "../infrastructure/auth.api.js";
import { DocumentType } from "../domain/model/document-type.value.js";

export const DocumentUploadService = {
  /** Convierte el File a base64 y lo sube al backend. */
  async uploadDocument(file, documentType) {
    if (!file || !file.name.endsWith(".pdf")) {
      throw new Error("Solo se aceptan archivos PDF");
    }
    const fileBase64 = await _toBase64(file);
    return AuthApi.uploadWorkerDocument({
      documentType,
      fileBase64,
      fileName: file.name,
    });
  },

  DocumentType,
};

function _toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result.split(",")[1]);
    reader.onerror = () => reject(new Error("Error al leer el archivo"));
    reader.readAsDataURL(file);
  });
}
