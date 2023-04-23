import React from 'react';

const About = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      className="about"
    >
      <h2>About Us</h2>
      <p
        style={{
          fontSize: '15px',
          letterSpacing: '1px',
          lineHeight: 1.8,
          textAlign: 'justify',
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum velit
        nihil officiis molestiae quia nulla mollitia reprehenderit ea fugiat
        debitis id quibusdam dolores odit ratione dolorum ad vero, pariatur
        incidunt, neque, repellat excepturi hic ipsam adipisci. Saepe, cumque
        cum expedita corrupti id numquam veniam commodi repellendus molestias
        tempore voluptatem aut ab voluptate. Tenetur, ratione iure ex facilis
        velit atque, aspernatur quo ducimus enim nulla recusandae minus maiores
        dolorem, sunt asperiores voluptatum odio eveniet. Vero quam, perferendis
        impedit quas perspiciatis dignissimos sed vitae molestiae sapiente quis,
        consectetur error id soluta culpa et ratione accusantium, expedita quae
        officia magnam esse sunt facilis!
      </p>
    </div>
  );
};

export default About;
