import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonText,
  IonBadge,
  IonModal,
  IonContent,
} from "@ionic/react";
import { card, checkmark } from "ionicons/icons";
import { PlatformModalHeader } from "../PlatformModalHeader";
import "./NFCProducts.scss";

interface NFCProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  pricePerUnit?: string;
  image?: string;
  features: string[];
  recommended?: boolean;
}

interface NFCProductsProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const NFCProducts: React.FC<NFCProductsProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const products: NFCProduct[] = [
    {
      id: "church-tap",
      name: "Church Tap",
      description:
        "Church Tap is revolutionizing how churches stay in touch with their congregation! Using powerful NFC technology, it creates an instant, gentle link between your church and its members.",
      price: "$100",
      pricePerUnit: "$2 per unit",
      features: [
        "50 units included",
        "Perfect for bulk distribution",
        "Ideal for events and services",
        "Cost-effective solution",
      ],
      recommended: true,
    },
    {
      id: "card-tap-white",
      name: "Card Tap - PBC Plastic White",
      description:
        "Meet the Card Tap, our sleek, NFC-enabled card designed for joyful personal and community sharing. It's a truly elegant way to share your digital content with a simple, friendly tap.",
      price: "$19.99",
      features: [
        "Premium PBC plastic",
        "Durable white finish",
        "Personal or professional use",
        "Share contact info & resources",
      ],
    },
    {
      id: "card-tap-transparent",
      name: "Card Tap - Transparent",
      description:
        "Our Card Tap - Transparent offers the same amazing NFC magic but with a cool, modern, see-through design. This translucent card beautifully reflects the transparency and open connection we aim for.",
      price: "$24.99",
      features: [
        "Unique transparent design",
        "Modern aesthetic",
        "Premium quality",
        "Stand out from the crowd",
      ],
    },
  ];

  const handleSelectProduct = (productId: string) => {
    if (onSelectProduct) {
      onSelectProduct(productId);
    }
    // TODO: Redirect to purchase page or open checkout
    window.open(`https://shop.daylybread.com/products/${productId}`, "_blank");
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="nfc-products-modal">
      <div className="nfc-products-wrapper">
        {/* Header */}
        <PlatformModalHeader
          title="Shop NFC Products"
          onClose={onClose}
        />

        <IonContent className="ion-padding">
          <div className="nfc-products-container">
          <div className="products-intro">
            <h2>Enable Tap-to-Access with NFC Tags</h2>
            <p>
              Choose the perfect NFC product for your needs. All products work seamlessly
              with your home screens to provide instant access via a simple tap.
            </p>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <IonCard key={product.id} className={`product-card ${product.recommended ? 'recommended' : ''}`}>
                {product.recommended && (
                  <IonBadge color="success" className="recommended-badge">
                    <IonIcon icon={checkmark} /> Most Popular
                  </IonBadge>
                )}
                <IonCardHeader>
                  <IonCardTitle>{product.name}</IonCardTitle>
                  <div className="product-price">
                    <span className="price">{product.price}</span>
                    {product.pricePerUnit && (
                      <span className="price-per-unit">{product.pricePerUnit}</span>
                    )}
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-features">
                    <IonText color="medium">
                      <strong>Features:</strong>
                    </IonText>
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>
                          <IonIcon icon={checkmark} color="success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <IonButton
                    expand="block"
                    shape="round"
                    color={product.recommended ? "success" : "primary"}
                    onClick={() => handleSelectProduct(product.id)}
                  >
                    <IonIcon slot="start" icon={card} />
                    {product.recommended ? "Buy Now - Best Value" : "Buy Now"}
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          <IonCard className="info-card">
            <IonCardContent>
              <h3>How It Works</h3>
              <ol>
                <li>Purchase your preferred NFC product</li>
                <li>Receive your NFC tags via mail</li>
                <li>Assign tags to your home screens in the platform</li>
                <li>Share tags with your congregation for tap-to-access</li>
              </ol>
              <IonText color="medium">
                <p style={{ fontSize: '14px', marginTop: '12px' }}>
                  Need help choosing? Contact our support team for personalized recommendations.
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      </div>
    </IonModal>
  );
};
