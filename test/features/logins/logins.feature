Feature: IAM Logins for different role

    Feature Description

    @Logins @Regression
    Scenario Outline: <TestID>: Multiple role Login 
    Given As a standard user I login to SwagLabs
        |UserType           | Username      | Password      |
        |Standard User      | standard_user | secret_sauce  |
        |Locked Out User    | standard_user | secret_sauce  |
        |Performance User   | standard_user | secret_sauce  |
        |Problem User       | standard_user | secret_sauce  |
    When Products page is opened
    Then Inventory page should list <NumberOfProducts>
    # Then Validate all products have valid price


    Examples:
        | TestID        | NumberOfProducts | 
        | INTV_TC001    | 6                | 