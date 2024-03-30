import React, { useState, useEffect } from "react";
import axios from "axios";
import { generatePayload } from "promptpay-qr"; // Import generatePayload function from promptpay-qr library
import { toString } from "qrcode"; // Import toString function from qrcode library
import { saveAs } from "file-saver"; // Import saveAs function from file-saver library

const QRGenerator = ({ mobileNumber, IDCardNumber, amount }) => {
  const [qrCode, setQRCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mobileNumber && !IDCardNumber) {
      setError("Please provide either a mobile number or an ID card number.");
      return;
    }

    const payload = generatePayload(mobileNumber || IDCardNumber, { amount });
    toString(
      payload,
      { type: "svg", color: { dark: "#000", light: "#fff" } },
      (err, svg) => {
        if (err) {
          setError("Error generating QR code.");
          console.error("QR code generation error:", err);
        } else {
          setQRCode(svg);
        }
      }
    );
  }, [mobileNumber, IDCardNumber, amount]);

  const downloadQRCode = () => {
    if (!qrCode) {
      setError("QR code is not generated yet.");
      return;
    }

    const blob = new Blob([qrCode], { type: "image/svg+xml" });
    saveAs(blob, "payment_qr_code.svg");
  };

  return (
    <div>
      {qrCode && (
        <div>
          <h2>Payment QR Code</h2>
          <div dangerouslySetInnerHTML={{ __html: qrCode }} />
          <button onClick={downloadQRCode}>Download QR Code</button>
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default QRGenerator;
