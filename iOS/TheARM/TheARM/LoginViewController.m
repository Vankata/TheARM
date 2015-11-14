//
//  LoginViewController.m
//  TheARM
//
//  Created by Mihail Karev on 11/1/15.
//  Copyright © 2015 Accedia. All rights reserved.
//

#import "LoginViewController.h"
#import "RestManager.h"

@interface LoginViewController ()
    @property (weak, nonatomic) IBOutlet UITextField *username;
    @property (weak, nonatomic) IBOutlet UITextField *pasword;
    @property (weak, nonatomic) IBOutlet UIButton *loginButton;
@end

@implementation LoginViewController

-(void)viewDidLoad{
    [super viewDidLoad];    
}

- (IBAction)clickLogin:(id)sender {
    NSLog(@"Username %@", self.username.text);
    NSLog(@"Password %@", self.pasword.text);

    [RestManager doLogin:self.username.text password:self.pasword.text andToken:@"asd" onSuccess:^(NSObject *responseObject) {
        NSLog(@"Success");
        [self performSegueWithIdentifier:@"LoginSegue" sender:self];
    } onError:^(NSError *error) {
        NSLog(@"ERROR --- ");
    }];

}
@end
