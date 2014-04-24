mvc-framework (Project in progress...)
=============
This is a MVC framework for achieving basic functionality:
1. Two way data binding
2. Provides services to read data from the server(currently only JSON)

## Getting Started

To get you started you can simply clone the mvc-framework repository and install the dependencies:

### Clone mvc-framework

Clone the mvc-framework repository using [git][git]:


git clone https://github.com/rakeshmakluri/mvc-framework
cd mvc-framework


### Install Dependencies


npm install


### Run the Application

You can directly launch the mysampleapp.htm file in chrome which is located under the folder "app/"


### Running Unit Tests

Unit tests are written in [Jasmine][jasmine], which run with the [Karma Test Runner][karma]. A Karma
configuration file to run them is provided.

* the configuration is found at "test/karma.conf.js"
* the unit tests are found in "test/".

The easiest way to run the unit tests is to use the supplied npm script:

npm test