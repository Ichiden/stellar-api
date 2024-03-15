import axios from 'axios'
import protect from '../utils/protect.js'

// CREATE CHECKOUT SESSION
export const createCheckout = async(req,res,next) => {
    const token = req.body.token

    const user = await protect(token)

    if(user === 'Not authorized, no token'){
      res.status(401).json(user)
      return
    }
      
    if(user === 'Not authorized, invalid token'){
      res.status(401).json(user)
      return
    }



    const price = Number(`${req.body.price}00`)
    const productId = req.body.courseId
    // PRODUCT ID / OWNER_ID /
    const description = `${productId}/${req.body.ownerId}/${req.body.type}/${req.body.regType}`;

    const options = {
      method: 'POST',
      url: 'https://api.paymongo.com/v1/checkout_sessions',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: 'Basic c2tfdGVzdF9IQkVyQ0N3YzRmM2kzNm1hbnFCUG5TTGc6'
      },
      data: {
        data: {
          attributes: {
            send_email_receipt: false,
            show_description: true,
            show_line_items: true,
            cancel_url: 'https://youtube.com',
            description: description,
            line_items: [
              {currency: 'PHP', amount:price, description: 'THIS IS A SAMPLE DESC', name: 'Denver', quantity: 1}
            ],
            payment_method_types: ["gcash","paymaya","card","billease","dob","dob_ubp"],
            success_url: process.env.MONGOPAY_SUCCESS_URL
          }
        }
      }
    };
    // PROCEED TO CHECK OUT
    axios
      .request(options)
      .then(function (response) {
        return res.status(200).json(response.data.data)
      })
      .catch(function (error) {
        console.error('SOMETHING WENT WRONG');
    });
}

// RETRIEVE CHECKOUT SESSION
export const retrieve = async(req,res,next) => {
    const checkoutId = req.query.checkoutId
    // const token = req.query.token;

    // const user = await protect(token)

    // if(user === 'Not authorized, no token'){
    //   res.status(401).json(user)
    //   return
    // }
      
    // if(user === 'Not authorized, invalid token'){
    //   res.status(401).json(user)
    //   return
    // }

    const options = {
      method: 'GET',
      url: `https://api.paymongo.com/v1/checkout_sessions/${checkoutId}`,
      headers: {
        accept: 'application/json',
        authorization: 'Basic c2tfdGVzdF9IQkVyQ0N3YzRmM2kzNm1hbnFCUG5TTGc6'
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data)
      })
      .catch(function (error) {
        console.error('SOMETHING WENT WRONG');
      });
}