import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'cesarchalimond93@gmail.com',
        pass: 'zekltnldbozapqnd',
    },
    from:'cesarchalimond93@gmail.com'
});

export const sendEmail = async (to:string,code:string): Promise<void> =>{


    const mailOptions = {
        from: '"Nucbanetta" cesarchalimond93@gmail.com',
        to,
        subject: "Codigo de verificacion para la Nucbanetta",
        text:` 
            Se ha completado tu registro exitosamente.

            Tu codigo de activacion es: ${code}
        `
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log("Correo electronico enviado");
    } catch (error) {
        console.error("Error al enviar el correo electronico: ", error)
    }
}