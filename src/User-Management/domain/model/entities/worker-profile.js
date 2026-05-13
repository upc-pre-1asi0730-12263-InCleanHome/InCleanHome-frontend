export class WorkerProfile {

    constructor({

                    userId,

                    district,

                    description,

                    services,

                    yearsExperience,

                    hourlyRate,

                    criminalRecordPdf,

                    experiencePdf,

                    verificationStatus,

                }) {

        this.userId = userId;

        this.district = district;

        this.description =
            description;

        this.services = services;

        this.yearsExperience =
            yearsExperience;

        this.hourlyRate =
            hourlyRate;

        this.criminalRecordPdf =
            criminalRecordPdf;

        this.experiencePdf =
            experiencePdf;

        this.verificationStatus =
            verificationStatus;
    }
}