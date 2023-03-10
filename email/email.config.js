import nodemailer from 'nodemailer';
import { measureMemory } from 'vm';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "juancarlos192003@gmail.com", // generated ethereal user
        pass: "apqzleebrhjvpdxd", // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log('Ready for send email');
});

export const sendEmail = async (email, subject, html) => {
    try {
        await transporter.sendMail({
            from: "juancarlos192003@gmail.com",
            to: email,
            subject,
            text: "Verifica tu email",
            html
        })
    } catch (error) {
        console.log("ha occurrido un erro al mandar el email", error)
    }
};

export const getTemplate = (message) => {
    const PhoneStyle = (d) => {
        const f = d.slice(0, 3)
        const t = d.slice(3, 6)
        const g = d.slice(6)
        return f + '-' + t + '-' + g
    }
    const CedulaSyle = (d) => {
        const f = d.slice(0, 3)
        const t = d.slice(3, 10)
        const g = d.slice(10)
        return f + '-' + t + '-' + g
    }
    var footle = '';
    const foo = `<head>
    <title>Pagina prueba</title>
    <style>
        .login-box {
            margin: 0;
            padding: 0;
            position: absolute;
            font-family: sans-serif;
            top: 40%;
            left: 50%;
            width: 864px;
            padding: 40px;
            transform: translate(-50%, -50%);
            background: linear-gradient(#141e30, #243b55);
            box-sizing: border-box;
            box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
            border-radius: 10px;
        }

        .login-box .user-box {
            position: relative;
        }

        .login-box .user-box input {
            width: 100%;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            margin-bottom: 10px;
            border: none;
            border-bottom: 1px solid #fff;
            outline: none;
            background: transparent;
        }

        .login-box .user-box label {
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            pointer-events: none;
            transition: .5s;
        }

        .login-box .user-box input:focus~label,
        .login-box .user-box input:valid~label {
            top: -20px;
            left: 0;
            color: #03e9f4;
            font-size: 12px;
        }

        .login-box a {
            position: relative;
            align-items: center;
            display: inline-block;
            padding: 10px 80px;
            cursor: pointer;
            color: #03e9f4;
            font-size: 16px;
            text-decoration: none;
            text-transform: uppercase;
            overflow: hidden;
            transition: .5s;
            letter-spacing: 4px
        }

        .login-box a:hover {
            background: #03e9f4;
            color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
        }

    </style>
    <style>
        .d-flex {
            display: flex;
        }

        .pt-3 {
            position: relative;
            top: 0px;
        }

        .text-white {
            color: #e4e4e4;
        }

        .col-5 {
            width: 50%;
        }

        .col-3 {
            width: 25.3%;
        }

        .fs-2 {
            font-size: 24px;
        }

        .fs-6 {
            font-size: 14px;
        }

        .fw-bold {
            font-weight: 600;
        }

        .position-absolute {
            position: absolute;
        }

        .fs-1 {
            font-size: 20px;
        }

        .w-100 {
            width: 100%;
        }

        .h-100 {
            height: 100%;
        }

        .bg-secondary {
            background-color: rgb(79, 78, 78);
            border-radius: 10px;
            margin-top: 10px;
            padding: 3px;
        }

        .pt-4 {
            padding-top: 10px;
        }

        .pt-5 {
            padding-left: 50px;
            padding-right: 50px;
            margin-bottom: 20px;
        }
    </style>
</head>
<div class='login-box'>
    <div class="p-5" style="padding-bottom: 30px;display: block">
        <div class="d-flex">
            <img src="https://af-corredores.web.app/img/logo.png" style="width: 100px;">
            <h2 class="text-white fs-2 fw-bold pt-3 col-5">AF Corredores & Asesores de
                Seguros y Fianzas, SRL</h2>
        </div>
        <span class="text-white px-5 mx-5" style="font-size: 12px;margin-left: 16vh;">El único
            modo de estar seguro es
            cotizando con nosotros.
        </span>
    </div>
    <div class="pt-5">
        <div class="w-100 h-100 bg-secondary rounded p-5 ">
            <h2 class="fw-bold text-white" style="padding-left: 10px;">Detalles de la Cotizacion</h2>
            <div class="text-white" style="padding-left: 20px;" >
            ${message.map((row, index) => {
        if (row?.name === 'Fecha de Nacimiento' || row?.name === 'Fecha de Salida' || row?.name === 'Fecha de Retorno') {
            footle = `<div style="display: flex;">
                    <h3 class="fw-bold" style="font-size: 20px;"> ${row?.name}: </h3>
                    <p style="padding-top: 8px;padding-left: 10px;font-size: 16px;"> ${new Date(row?.value).toLocaleDateString()} </p>
                    </div>`
        } else if (row?.name === 'Telefono') {
            footle = `<div style="display: flex;">
            <h3 class="fw-bold" style="font-size: 20px;"> ${row?.name}: </h3>
            <p style="padding-top: 8px;padding-left: 10px;font-size: 16px;"> ${PhoneStyle(row?.value)} </p>
            </div>`
        } else {
            footle = `<div style="display: flex;">
            <h3 class="fw-bold" style="font-size: 20px;"> ${row?.name}: </h3>
            <p style="padding-top: 8px;padding-left: 10px;font-size: 16px;"> ${row?.value} </p>
            </div>`
        }
        if (row.fullname !== undefined) {
            return `<div style="display: flex;">
            <h3 class="fw-bold" style="font-size: 20px;"> Titular ${index - 1} </h3>
            </div>
            <div style="display: flex;">
            <h3 class="fw-bold" style="font-size: 20px;"> Nombre Completo: </h3>
            <p style="padding-top: 8px;padding-left: 10px;font-size: 16px;"> ${row?.fullname} </p>
            </div>
            <div style="display: flex;">
            <h3 class="fw-bold" style="font-size: 20px;"> Cedula: </h3>
            <p style="padding-top: 8px;padding-left: 10px;font-size: 16px;"> ${CedulaSyle(row?.cedula)} </p>
            </div>
            <div style="display: flex;">
            <h3 class="fw-bold" style="font-size: 20px;"> Fecha Nacimiento: </h3>
            <p style="padding-top: 8px;padding-left: 10px;font-size: 16px;"> ${new Date(row?.dNacimiento).toLocaleDateString()} </p>
            </div>
            <div style="display: flex;">
            <h3 class="fw-bold" style="font-size: 20px;"> Telefonono: </h3>
            <p style="padding-top: 8px;padding-left: 10px;font-size: 16px;"> ${PhoneStyle(row?.phone)} </p>
            </div>`
        } else {
            return footle
        }
    })}
            </div>
        </div>
    </div>
    <center>
        <a href="https://wa.me/+18099810290">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Chatea con nosotros
        </a>
    </center>
</div>`
    return foo
}