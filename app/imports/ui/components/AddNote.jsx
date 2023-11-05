import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';
import PropTypes from 'prop-types';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  note: String,
  ownerId: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddNote = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { note, ownerId, cratedAt } = data;
    const owner = Meteor.user().username;
    Notes.collection.insert(
      { note, ownerId, cratedAt, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Contact</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="note" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" value={owner} />
                <HiddenField name="contactId" value={contactId} />
                <HiddenField name="createdAt" value={new Date()} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddNote.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
};

export default AddNote;
