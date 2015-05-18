<?php
/**
 * Created by PhpStorm.
 * User: kaflan
 * Date: 14.05.15
 * Time: 15:18
 */
$I = new AcceptanceTester($scenario);
$I->wantTo('login as regular user');
$I->amOnPage('/');
$I->submitForm('.js-site-search-form',array('q'=>'davertmik'));
$I->click('//nav/a[4]');
$I->see('Search', 'h1');
$I->see('DavertMik', '.user-list-item');
$I->click('DavertMik');
$I->canSee('DavertMik', 'h1');
$I->canSeeLink('Codeception', '/DavertMik/Codeception');
$I->seeCurrentUrlEquals('/DavertMik');

?>