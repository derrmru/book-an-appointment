import { useState, useEffect, useRef } from "react"

const PayPal = (props) => {
    const [sdk, setSdk] = useState(false);

    //Paypal state
    const [paidFor] = useState(false);
    //const [error, setError] = useState();
    let paypalRef = useRef(null);

    //Product details
    const product = {
        price: props.price,
        description: props.description
    }

    //PAYPAL BUTTON RENDER
    const renderPP = () => {
        setSdk(true)
        window.paypal.Buttons({
            style:{
              shape: 'rect',
              color: 'white',
              layout: 'vertical',
              label: 'pay',
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      value: product.price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              console.log(order);
              props.paySubmit()
            },
            onError: err => {
              //setError(err);
            }
          }).render(paypalRef.current);
    }

    useEffect(() => {
      if (sdk === false) {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AdPO7ubK-G_3uk2Y91sh6JQ0mcntdQuQodb1KlzMNd4EDhxIncASD9iWMFRE5Q_ZaMx-qHqa8Rw_CCn6&currency=GBP";
        script.async = true;
        script.onload = () => renderPP();
        document.body.appendChild(script);
      }
    })

    return (
        <>
            {sdk && 
                paidFor === false && <div ref={paypalRef}></div>
            }
        </>
    )
}

export default PayPal