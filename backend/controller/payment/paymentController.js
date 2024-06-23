// const Order=require("../../models/order");
const crypto =require("crypto")


const Razorpay = require('razorpay'); 
const { Order } = require("../../models/order");
const { Payment } = require("../../models/payment");
// const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_xPVa3bQVtAEBpj",
    key_secret: "fre9cQcQoKpQdUU3FPRVzj2U"
});

const buySubscription = async (req, res, next) => {
    const options = {
      amount: req.body.amount,
      currency: req.body.currency,
    };
    console.log(req.body);
    const order = await razorpayInstance.orders.create(options);
    const user_id = req.body.user._id;
  
    await Order.create({
      order_id: order.id,
      status: order.status,
      user_id: user_id,
    });
  
    console.log(user_id);
    res.status(200).json({
      success: true,
      order,
      user_id,
    });
  };
  // export default buySubscription;
  
  
  
 const paymentVerification = async (req, res, next) => {
  console.log("successfull",req.body)
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    // console.log("body ", req.body);
    const expectedSignature = crypto
    .createHmac("sha256", "fre9cQcQoKpQdUU3FPRVzj2U")
    
    // process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");
    
    const isAuthentic = expectedSignature === razorpay_signature;
    //var id=user.id;
    if (isAuthentic) {
      // Database comes here
      
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      //   const order = await Order.findOneAndUpdate(
        //     {
          //       order_id: razorpay_order_id,
          //     },
          //     // {user_id: req.params.id},
          //     { status: "active" },
          // { new: true }
          //   );
          // const user=await User.findByIdAndUpdate(
            //   {_id:}
            // )
            // console.log(req.params.id)
            //   const user = await User.findOneAndUpdate(
              //     {
                //       _id: req.params.id,
                //     },
                //     // {user_id: },
                //     { status: "active" },
                //     // { new: true }
                //   );
                // console.log(req.currentUser._id)
                //   await order.save();
                res.redirect(
                  `http://localhost:3000/paymentSucessfull`
                  
                );
              } else {
      res.status(400).json({
        success: false,
      });
    }
  };
  //   export const getRazorPayKey = async (req, res, next) => {
    //     res.status(200).json({
      //       success: true,
      //       key: "rzp_test_xPVa3bQVtAEBpj",
      //       // process.env.RAZORPAY_API_KEY,
      //     });
      //   };
      // export default paymentVerification;

      module.exports = {
        paymentVerification: paymentVerification,
        buySubscription: buySubscription,
        // About: About,
        // Contact: Contact
    }