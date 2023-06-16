import Books from '../models/book_model';
import Users from '../models/user_model';
import { isValid } from '../validations/validations';

export const createBook = async (req, res) => {
  const data = req.body;
  const userId = req.userId;

  try {
    if (!isValid(userId)) {
      return res.status(400).send({ status: false, msg: 'userID is required' });
    }
    if (!Object.keys(data).length === 0) {
      return res.status(400).send({ status: false, msg: 'userId is required' });
    }

    if (!isValid(data.title)) {
      return res.status(400).send({ status: false, msg: 'title is required' });
    }
    if (!isValid(data.excerpt)) {
      return res
        .status(400)
        .send({ status: false, msg: 'excerpt is required' });
    }
    if (!isValid(data.ISBN)) {
      return res.status(400).send({ status: false, msg: 'title is required' });
    }
    if (!isValid(data.category)) {
      return res
        .status(400)
        .send({ status: false, msg: 'category is required' });
    }
    if (!isValid(data.subcategory)) {
      return res
        .status(400)
        .send({ status: false, msg: 'subcategory is required' });
    }

    const duplicate = await Books.findOne({ title: data.title });
    if (duplicate) {
      return res
        .status(400)
        .send({ status: false, msg: 'title already exists' });
    }

    const duplicateISBN = await Books.findOne({ ISBN: data.ISBN });
    if (duplicateISBN) {
      return res
        .status(400)
        .send({ status: false, msg: 'ISBN already exists' });
    }

    const isAuthorPresent = await Users.findOne(userId);
    if (!isAuthorPresent) {
      return res
        .status(400)
        .send({ status: false, msg: 'Author id not present' });
    }

    let createBooks = await Books.create(data);
    if (Object.keys(createBooks).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: 'please provide some data' });
    } else {
      res.status(200).send({ status: true, msg: createBooks });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};


export default  createBook ;
