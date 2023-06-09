import Users from '../models/model.js';
import { isValid, isValidTitle } from '../validations/validations.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
  try {
    const data = req.body;

    const { title, name, phone, email, password, address } = data;
    if (Object.keys(data) >= 0) {
      return res
        .status(400)
        .send({ status: false, message: 'Data is Missing' });
    }

    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: 'title is required' });
    }

    if (!isValidTitle(title)) {
      return res.status(400).send({
        status: false,
        message: `${title} is not valid,title must be from defined Enum ['Mr', 'Mrs', 'Miss']`,
      });
    }

    const reqName = isValid(name);
    if (!reqName) {
      return res.status(400).send({ status: false, msg: 'name is required ' });
    }
    const reqPhone = isValid(phone);
    if (!reqPhone) {
      return res.status(400).send({ status: false, msg: 'phone is required' });
    }

    const validPhone = phone;
    if (!/^(?!6)\d{10}$/.test(validPhone)) {
      return res
        .status(400)
        .send({ status: false, msg: 'please provide a valid phone' });
    }

    const validEmail = email.trim();
    if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(validEmail)) {
      return res
        .status(400)
        .send({ status: false, msg: 'Please provide a valid email' });
    }

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)) {
      return res.status(400).send({
        status: false,
        msg: 'password must be Upper and lower case a',
      });
    }

    data.password = bcrypt.hashSync(password, 7);

    const reqAddress = isValid(address);
    if (!reqAddress) {
      return res
        .status(400)
        .send({ status: false, msg: 'Address is required' });
    }

    const reqCity = isValid(address.city);
    if (!reqCity) {
      return res.status(400).send({ status: false, msg: 'city is required' });
    }

    const reqPincode = isValid(address.pincode);
    if (!reqPincode) {
      return res
        .status(400)
        .send({ status: false, msg: 'pincode is required' });
    }

    if (!/^[1-9][0-9]{5}$/.test(address.pincode.trim())) {
      return res.status(400).send('pincode is invalid');
    }
    const duplicatephone = await Users.findOne({ phone: phone });
    if (duplicatephone) {
      return res
        .status(400)
        .send({ status: false, msg: 'Mobile number already exists' });
    }
    const duplicateEmail = await Users.findOne({ email: email });
    if (duplicateEmail) {
      return res
        .status(400)
        .send({ status: false, msg: 'Email number already exists' });
    }
    let savedData = await Users.create(data);
    return res.status(201).send({ status: true, msg: savedData });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(400).send({ status: false, msg: ' email is required' });
  }

  if (!password) {
    return res
      .status(400)
      .send({ status: false, msg: ' password is required' });
  }

  const data = await Users.findOne({ email: email, password: password });

  const token = jwt.sign(
    {
      userId: data._id,
      batch: 'Book-Management',
      organisation: 'Demon-CORP',
    },
    'decode',
    { expiresIn: '1hr' }
  );
  console.log(token);
  return res.status(201).send({ status: true, message: token });
};
export default { createUser, userLogin };
