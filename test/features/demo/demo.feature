Feature: Feature name

    Feature Description

    @Demo @Smoke @Logins @@Regression
    Scenario Outline: <TestID>: Scenario Outline name
    Given Google Homepage is opened
    When Search with <SearchItem>
    Then Click on the first result
    Then URL should match <ExpectedURL>


    Examples:
        | TestID        | SearchItem | ExpectedURL              |
        | DEMO_TC001    | webdriverio| https://webdriver.io/    |