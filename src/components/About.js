import React from 'react'
import './About.css';
import { Container, Row, Col, Card } from 'react-bootstrap';


const CustomAbout = () => {
  return (
    <div>
   <Container>
   <section className="about-us-container">
      <div className="about-us-content">
        <h2>About Us</h2>
        <p>
          WCS (Waste Collection System) is committed to providing efficient and sustainable waste collection and management services, with a vision to drive a "Green Future" for our communities. Our mission is to make it easy for individuals and businesses to responsibly dispose of waste, promoting a cleaner and greener environment.
      </p>
      <p>
         Established in 2024, WCS has quickly become a trusted partner in waste management across various regions. Through our "Green Future" initiative, our dedicated team ensures that waste from homes, restaurants, and businesses is collected, sorted, and responsibly recycled or disposed of. Our primary focus is to reduce landfill waste and promote sustainable practices by offering a range of service plans tailored to our customers' diverse needs.
    </p>

      <p>
         Our services include daily, weekly, and monthly collection plans, catering to households, businesses, and industrial clients. With a fleet of modern vehicles and a dedicated team, we are committed to timely and efficient waste collection services. By prioritizing sustainability, WCS is driving towards a Green Future where waste is minimized, and recycling becomes second nature.
    </p>
    <p>
         Join WCS today, and become part of the Green Future movement. Let's work together to create a cleaner, more sustainable world. For inquiries or service requests, reach out to our customer service hotline at 0912234567.
    </p>
      </div>
    </section>
    <hr></hr>
    {/* Review section*/ }
     <Container className="review-section my-5">
      <h4 className="text-center">OUR CUSTOMERS SPEAK fOR US</h4>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="review-card">
            <Card.Header className="text-white name-header">Kasun Sanjeewa</Card.Header>
            <Card.Body>
              <Card.Text>
                WCS has been fantastic! Their waste collection service is always on time, and I love knowing that they prioritize the environment. Highly recommend!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="review-card">
            <Card.Header className="text-white name-header">Nimal Perera</Card.Header>
            <Card.Body>
              <Card.Text>
                The team at WCS is very professional. They make waste collection easy and hassle-free. Their commitment to sustainability is truly inspiring!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="review-card">
            <Card.Header className="text-white name-header">Chathura Fernando</Card.Header>
            <Card.Body>
              <Card.Text>
                I appreciate how WCS separates and recycles waste. It makes me feel good to know that I'm contributing to a cleaner environment. Great service!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </Container>
    </div>
  )
}

export default CustomAbout
