Feature: Cucumber Demo
    # Author: <Raj Kumar> <<rkumar@otalio.com>>

    #This is simple text which can be added directly after Feature
    # Know Issue
    # Questions/Clarification
    # Use "But" keyword or it's alternative "*"
    # Use "Background" for common steps or repetitive steps in scenario
    # Only one Background is allowed per feature file

    Background: Launching Google Homepage
        Given Google Homepage is opened

    @FeatureInDetail
    Scenario: Scenario name1
        When Search with WebdriverIO
        Then Click on the first result
        Then URL should match https://webdriver.io/